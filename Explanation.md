## Bug Explanation

### What was the bug?

The bug occurred when `oauth2Token` stored in `HttpClient` was not an actual `OAuth2Token` instance but instead a plain JavaScript object that looked similar to a token (for example `{ accessToken, expiresAt }`).

Before the fix, the client treated any truthy object as a valid token.
Because of this, the refresh logic was skipped and the request was sent without generating a real OAuth2 token instance. As a result, the `Authorization` header was sometimes missing or incorrect.

---

### Why did it happen?

The original implementation only checked whether the token existed and whether it was expired.
It did not verify that the token was actually an instance of the `OAuth2Token` class.

Since plain objects are truthy in JavaScript/TypeScript, they passed the validity check even though they did not contain the class behaviour required to produce headers (such as the `asHeader()` method).

This caused the client to assume a usable token existed when it actually did not.

---

### Why does the fix solve it?

The updated logic explicitly checks:

1. If the token is missing
2. If the token is expired
3. If the token is not an instance of `OAuth2Token`

If any of these conditions are true, the client refreshes the token.

This guarantees that before any API request is sent, the client always holds a real `OAuth2Token` instance.
Because of this, the Authorization header is consistently generated and attached.

The fix is minimal, safe, and does not change unrelated behaviour.

---

### One realistic case still not covered

The current tests assume that `refreshOAuth2()` always succeeds.
They do not verify what happens if the refresh process fails, throws an error, or returns a token that is already expired.
Handling refresh failures would require additional error-handling logic and tests.
