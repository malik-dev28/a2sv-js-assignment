import { HttpClient } from "../src/httpClient";
import { OAuth2Token } from "../src/tokens";
import { describe, test, expect } from "vitest";

describe("HttpClient OAuth2 behavior", () => {
  // Before erorr : plain-object tokens were treated as valid, so refresh didn't run.
  // After and fix issues : any non-OAuth2Token object triggers refresh and a real token is used.
  test("api=true sets Authorization header when token is valid", () => {
    const c = new HttpClient();
    c.oauth2Token = new OAuth2Token("ok", Math.floor(Date.now() / 1000) + 3600);

    const resp = c.request("GET", "/me", { api: true });

    expect(resp.headers.Authorization).toBe("Bearer ok");
  });

  test("api=true refreshes when token is missing", () => {
    const c = new HttpClient();
    c.oauth2Token = null;

    const resp = c.request("GET", "/me", { api: true });

    expect(resp.headers.Authorization).toBe("Bearer fresh-token");
  });

  test("api=true refreshes when token is a plain object", () => {
    
    const c = new HttpClient();
    c.oauth2Token = { accessToken: "stale", expiresAt: 0 };

    const resp = c.request("GET", "/me", { api: true });

    expect(resp.headers.Authorization).toBe("Bearer fresh-token");
  });

  test("api=true refreshes when token is a non-class object even if it looks valid", () => {
    const c = new HttpClient();
    c.oauth2Token = {
      accessToken: "looks-valid",
      expiresAt: Math.floor(Date.now() / 1000) + 3600,
    };

    const resp = c.request("GET", "/me", { api: true });

    expect(resp.headers.Authorization).toBe("Bearer fresh-token");
  });
});