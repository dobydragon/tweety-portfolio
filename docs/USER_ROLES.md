# Tweety — User Roles & Permissions

Tweety is a **peer social network**. It does not implement tiered admin roles;
access is governed by **authentication state** and **data ownership**.

## Roles

### 1. Guest (unauthenticated)
Reached when no valid session (`uId`) is cached, or after sign-out.
- View the onboarding carousel
- Register a new account
- Log in
- See the offline screen when disconnected

**Cannot:** view the feed, post, comment, like, chat, or access profiles.

### 2. Member (authenticated)
The core role — any signed-in user.
- Create, view and **delete their own** posts
- Like any post; add comments; **delete their own** comments
- Real-time one-to-one messaging with other members
- View the users directory, search people, visit profiles
- Edit **their own** profile (avatar, cover, name, bio)

## How permissions are enforced

| Rule | Enforcement in code |
|------|--------------------|
| Only authenticated users reach the app | `main.dart` checks cached `uId`; else shows `Login` |
| A member only mutates their own profile | Updates target `users.doc(socialusermodel.uId)` |
| Only the author deletes a post/comment | Delete actions operate on the current user's content |
| Likes are one-per-user | Like stored at `likes.doc(uId)` (idempotent key) |
| Requests come from the genuine app | `FirebaseAppCheck` activated at startup |
| Identity established at login | `FirebaseAuth` issues the session `uId` |

## Recommended production hardening

The client enforces ownership through its queries. For a production deployment,
mirror these rules server-side with **Firestore Security Rules**, for example:

```
match /users/{userId} {
  allow read: if request.auth != null;
  allow write: if request.auth.uid == userId;
}
match /posts/{postId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null;
  allow update, delete: if request.auth.uid == resource.data.uId;
}
```

> Note: this ruleset is a **recommendation** for deployment, not a claim about
> what currently ships in the repository.
