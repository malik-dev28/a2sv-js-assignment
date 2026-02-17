## What was the bug?
When `oauth2Token` was a plain object instead of an `OAuth2Token` instance, the client skipped the refresh and never set the Authorization header.

## Why did it happen?
The refresh check only handled `null` and the `OAuth2Token` class. Any truthy non-class object bypassed refresh, leaving the request without a usable token.

## Why does your fix solve it?
The new check refreshes whenever the token is missing, expired, or not an `OAuth2Token` instance, ensuring a valid class-based token is present before setting the header.

## What is one realistic case the tests still do not cover?
If `refreshOAuth2()` fails or returns an already-expired token, the code still proceeds without handling that failure.
