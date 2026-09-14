export interface IAuthTokenJson {
  token: string;
}

export class AuthTokenResultDto {
  readonly data: IAuthTokenJson;

  constructor(token: string) {
    this.data = { token };
  }
}
