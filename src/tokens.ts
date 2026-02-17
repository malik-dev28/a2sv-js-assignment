export class OAuth2Token {
  accessToken: string;
  expiresAt: number; // unix seconds

  constructor(accessToken: string, expiresAt: number) {
    this.accessToken = accessToken;
    this.expiresAt = expiresAt;
  }

  get expired(): boolean {
    const now = Math.floor(Date.now() / 1000);
    return now >= this.expiresAt;
  }

  asHeader(): string {
    return `Bearer ${this.accessToken}`;
  }
}