import { BadRequestException } from "../../common/exceptions";
import { IMoney } from "./money.interface";

/**
 * Value Object: imutável, igualdade por valor, se auto-valida no construtor.
 * Guarda o valor em centavos (inteiro) para não acumular erro de ponto
 * flutuante em somas/subtrações sucessivas (ex.: 2008.8000000000002).
 */
export class Money implements IMoney {
  private readonly amountInCents: number;
  private readonly currency: string;

  constructor(amount: number, currency: string) {
    if (!currency) {
      throw new BadRequestException("money currency is required");
    }
    if (!Number.isFinite(amount)) {
      throw new BadRequestException("money amount must be a finite number");
    }
    if (amount < 0) {
      throw new BadRequestException("money amount cannot be negative");
    }
    this.amountInCents = Math.round(amount * 100);
    this.currency = currency;
  }

  private static fromCents(cents: number, currency: string): Money {
    return new Money(cents / 100, currency);
  }

  private assertSameCurrency(other: IMoney): void {
    if (other.getCurrency() !== this.currency) {
      throw new BadRequestException(
        `cannot operate on money with different currencies: ${this.currency} and ${other.getCurrency()}`,
      );
    }
  }

  getAmount(): number {
    return this.amountInCents / 100;
  }

  getCurrency(): string {
    return this.currency;
  }

  add(other: IMoney): Money {
    this.assertSameCurrency(other);
    return Money.fromCents(
      this.amountInCents + Math.round(other.getAmount() * 100),
      this.currency,
    );
  }

  subtract(other: IMoney): Money {
    this.assertSameCurrency(other);
    return Money.fromCents(
      this.amountInCents - Math.round(other.getAmount() * 100),
      this.currency,
    );
  }

  multiply(factor: number): Money {
    return Money.fromCents(this.amountInCents * factor, this.currency);
  }

  percentage(percent: number): Money {
    return Money.fromCents((this.amountInCents * percent) / 100, this.currency);
  }

  equals(other: IMoney): boolean {
    return (
      this.currency === other.getCurrency() &&
      this.amountInCents === Math.round(other.getAmount() * 100)
    );
  }
}
