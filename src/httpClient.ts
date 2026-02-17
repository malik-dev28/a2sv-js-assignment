import { OAuth2Token } from "./tokens";
export type TokenState = OAuth2Token | Record<string, unknown> | null;

export class HttpClient {
  oauth2Token: TokenState = null;

  refreshOAuth2(): void {
    this.oauth2Token = new OAuth2Token("fresh-token", 10 ** 10);
  }

  request(
    method: string,
    path: string,
    opts?: { api?: boolean; headers?: Record<string, string> }
  ): { method: string; path: string; headers: Record<string, string> } {
    const api = opts?.api ?? false;
    const headers = opts?.headers ?? {};

    if (api) {
      // Before erorrn this type of erorr is happens : plain-object tokens were treated as valid, so refresh did not run and no Authorization header was set.
      // After fix the issues: any non-OAuth2Token value triggers refresh, so a real token is created and used.
      const needsRefresh =
        !(this.oauth2Token instanceof OAuth2Token) || this.oauth2Token.expired;

      if (needsRefresh) {
        this.refreshOAuth2();
      }

      if (this.oauth2Token instanceof OAuth2Token) {
        headers["Authorization"] = this.oauth2Token.asHeader();
      }
    }

    return { method, path, headers };
  }
}