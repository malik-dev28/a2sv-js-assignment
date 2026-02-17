# Bug Explanation

## What was the bug?
The `HttpClient` failed to refresh the OAuth2 token when `oauth2Token` was a plain object (e.g., `{ accessToken: "...", expiresAt: ... }`) instead of an instance of the `OAuth2Token` class.

## Why did it happen?
The condition for refreshing the token was:
```typescript
if (!this.oauth2Token || (this.oauth2Token instanceof OAuth2Token && this.oauth2Token.expired))
```
When `oauth2Token` was a plain object:
1. `!this.oauth2Token` was `false` (because objects are truthy).
2. `this.oauth2Token instanceof OAuth2Token` was `false`.
Consequently, the refresh logic was skipped, but the subsequent code only set the `Authorization` header if the token was an `instanceof OAuth2Token`. This left the request without valid authentication.

## Why does your fix actually solve it?
The fix simplifies the condition:
```typescript
if (!(this.oauth2Token instanceof OAuth2Token) || this.oauth2Token.expired)
```
This new logic ensures that a refresh is triggered if:
- The token is `null` or `undefined` (not an instance).
- The token is a plain object (not an instance).
- The token is an `OAuth2Token` instance but has expired.

This covers all invalid or stale states, ensuring `this.oauth2Token` is always a valid, fresh `OAuth2Token` instance before use.

## What’s one realistic case / edge case your tests still don’t cover?
The current tests do not cover the "near-expiry" case (proactive refresh). If a token is valid for only 1 more second, the request might still be sent with it, but by the time it reaches the server, it might have expired. A more robust implementation would include a "buffer" time for expiry checks.
