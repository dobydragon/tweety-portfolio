# Tweety — Security

Security in Tweety is delivered through Firebase's managed services plus in-app
checks. This document describes what is present in the source.

## Authentication
- **Firebase Authentication** with email & password
  (`signInWithEmailAndPassword`, `createUserWithEmailAndPassword`).
- Session persistence via a cached `uId` in `shared_preferences` (`CacheHelper`).
  On launch the app routes to the feed only when a valid `uId` exists.
- **Sign-out** clears the cached `uId` and returns to the login screen.

## Firebase App Check
- `FirebaseAppCheck.instance.activate()` is called during startup in `main.dart`.
- Helps ensure backend requests originate from your genuine, untampered app.

## Email verification
- The user model carries an `isEmailverified` boolean.
- A dedicated verify-email screen with a send/resend action is included.

## Data ownership
- Profile updates are scoped to the signed-in user's `uId`.
- Post and comment deletions operate on the current user's own content.
- Likes are keyed by `uId`, preventing duplicate likes per user.

## Input & session handling
- Password fields are **obscured by default** with a show/hide toggle on both
  login and register.
- Connectivity is verified before the app proceeds; a **no-internet screen**
  prevents broken/unauthenticated states offline.

## Media
- User, post and chat images are uploaded to **Firebase Storage** and referenced
  by secure download URLs.

## Honest limitations / hardening recommendations
These are **recommendations** for a production deployment, not current claims:

1. **Do not store passwords in Firestore.** The user document currently includes a
   `password` field; rely on Firebase Auth alone and drop this field in production.
2. **Enforce Firestore Security Rules** server-side to mirror client ownership
   checks (see `USER_ROLES.md`).
3. **Enforce email verification** as a gate to sensitive actions.
4. **Enable Storage Security Rules** to restrict uploads to authenticated users
   and validate content types/sizes.
5. **Rotate to production App Check providers** (Play Integrity / App Attest).

## Summary

| Control | Status |
|---------|--------|
| Firebase Auth (email/password) | ✅ Live |
| App Check activated | ✅ Live |
| Email verification flow | ✅ Live |
| Ownership-scoped mutations (client) | ✅ Live |
| Offline guard | ✅ Live |
| Firestore/Storage server rules | 🧩 Recommended for deployment |
