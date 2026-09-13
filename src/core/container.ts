import "reflect-metadata";
import {
  INJECT_METADATA,
  MODULE_METADATA,
  type ClassProvider,
  type DynamicModule,
  type ExistingProvider,
  type FactoryProvider,
  type InjectionToken,
  type ModuleImport,
  type ModuleOptions,
  type Provider,
  type Type,
  type ValueProvider,
} from "./constants";

function isDynamicModule(m: ModuleImport): m is DynamicModule {
  return typeof m === "object" && m !== null && "module" in m;
}

function isClassProvider(p: Provider): p is ClassProvider {
  return typeof p === "object" && p !== null && "useClass" in p;
}

function isValueProvider(p: Provider): p is ValueProvider {
  return typeof p === "object" && p !== null && "useValue" in p;
}

function isFactoryProvider(p: Provider): p is FactoryProvider {
  return typeof p === "object" && p !== null && "useFactory" in p;
}

function isExistingProvider(p: Provider): p is ExistingProvider {
  return typeof p === "object" && p !== null && "useExisting" in p;
}

function tokenName(token: InjectionToken): string {
  if (typeof token === "function") return token.name;
  return String(token);
}

type Registration =
  | { kind: "class"; useClass: Type<any> }
  | { kind: "value"; useValue: any }
  | { kind: "factory"; useFactory: (...args: any[]) => any; inject: InjectionToken[] }
  | { kind: "existing"; useExisting: InjectionToken };

/**
 * Container global de DI + registro de módulos (estilo Nest, simplificado):
 * mantém um registry único (flat) de providers/controllers resolvido por
 * token, respeitando apenas a árvore de imports para saber o que carregar.
 * Não há escopo por módulo — providers exportados ou não ficam visíveis
 * globalmente assim que o módulo é carregado.
 */
export class Container {
  private readonly registry = new Map<InjectionToken, Registration>();
  private readonly instances = new Map<InjectionToken, any>();
  private readonly loadedModules = new Set<Type<any>>();
  private readonly controllers = new Set<Type<any>>();

  loadModule(moduleClass: Type<any>): void {
    if (this.loadedModules.has(moduleClass)) return;
    this.loadedModules.add(moduleClass);

    const options: ModuleOptions =
      Reflect.getMetadata(MODULE_METADATA, moduleClass) || {};

    for (const imported of options.imports ?? []) {
      if (isDynamicModule(imported)) {
        this.loadModule(imported.module);
        this.registerOptions(imported);
      } else {
        this.loadModule(imported);
      }
    }

    this.registerOptions(options);
  }

  private registerOptions(options: ModuleOptions): void {
    for (const provider of options.providers ?? []) {
      this.registerProvider(provider);
    }

    for (const controller of options.controllers ?? []) {
      this.registerProvider(controller);
      this.controllers.add(controller);
    }
  }

  private registerProvider(provider: Provider): void {
    if (isClassProvider(provider)) {
      this.registry.set(provider.provide, {
        kind: "class",
        useClass: provider.useClass,
      });
    } else if (isValueProvider(provider)) {
      this.registry.set(provider.provide, {
        kind: "value",
        useValue: provider.useValue,
      });
    } else if (isFactoryProvider(provider)) {
      this.registry.set(provider.provide, {
        kind: "factory",
        useFactory: provider.useFactory,
        inject: provider.inject ?? [],
      });
    } else if (isExistingProvider(provider)) {
      this.registry.set(provider.provide, {
        kind: "existing",
        useExisting: provider.useExisting,
      });
    } else {
      this.registry.set(provider, { kind: "class", useClass: provider });
    }
  }

  getControllers(): Type<any>[] {
    return [...this.controllers];
  }

  resolve<T = any>(token: InjectionToken): T {
    if (this.instances.has(token)) return this.instances.get(token);

    let registration = this.registry.get(token);

    if (!registration && typeof token === "function") {
      registration = { kind: "class", useClass: token as Type<any> };
      this.registry.set(token, registration);
    }

    if (!registration) {
      throw new Error(
        `[Container] Nenhum provider registrado para "${tokenName(token)}". ` +
          `Adicione a classe em "providers"/"controllers" de algum módulo carregado.`,
      );
    }

    const instance = this.build(token, registration);
    this.instances.set(token, instance);
    return instance;
  }

  private build(token: InjectionToken, registration: Registration): any {
    switch (registration.kind) {
      case "value":
        return registration.useValue;
      case "existing":
        return this.resolve(registration.useExisting);
      case "factory":
        return registration.useFactory(
          ...registration.inject.map((dep) => this.resolve(dep)),
        );
      case "class":
        return this.instantiate(registration.useClass, token);
    }
  }

  private instantiate(target: Type<any>, token: InjectionToken): any {
    // `emitDecoratorMetadata` (design:paramtypes) só existe em builds via tsc;
    // o runtime de dev (tsx/esbuild) não emite essa metadata. Por isso a DI
    // aqui não infere tipo por reflection: cada parâmetro precisa de um
    // @Inject(Token) explícito. `target.length` (arity da função) é usado
    // pra saber quantos parâmetros existem, já que não dá pra contar com
    // design:paramtypes.
    const injectOverrides: Record<number, InjectionToken> =
      Reflect.getMetadata(INJECT_METADATA, target) || {};

    const args = Array.from({ length: target.length }, (_, index) => {
      const depToken = injectOverrides[index];

      if (depToken === undefined) {
        throw new Error(
          `[Container] Parâmetro ${index} de "${tokenName(token)}" sem ` +
            `@Inject(Token). Toda dependência de construtor precisa de ` +
            `@Inject explícito (reflection por tipo não funciona sob tsx/esbuild).`,
        );
      }

      return this.resolve(depToken);
    });

    return new target(...args);
  }
}
