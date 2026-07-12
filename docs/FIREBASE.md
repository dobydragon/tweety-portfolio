# Tweety — Firebase Backend

Tweety uses Firebase as its complete backend. This document summarises each
service as used in the source.

## Services in use

| Service | Package | Role in Tweety |
|---------|---------|----------------|
| Core | `firebase_core` | Initialise Firebase at startup |
| Authentication | `firebase_auth` | Email/password sign-up & sign-in |
| Cloud Firestore | `cloud_firestore` | Users, posts, likes, comments, chats |
| Storage | `firebase_storage` | Avatars, covers, post & chat images |
| App Check | `firebase_app_check` | Backend abuse protection (activated) |
| Cloud Messaging | `firebase_messaging` | Push notifications (**prepared**) |

## Initialisation (`main.dart`)
```dart
WidgetsFlutterBinding.ensureInitialized();
await Firebase.initializeApp();
await FirebaseAppCheck.instance.activate();
```

## Firestore collections
- `users/{uId}` — profile documents
  - `users/{uId}/chats/{otherUId}/messages/{messageId}`
- `posts/{postId}` — feed posts
  - `posts/{postId}/likes/{uId}`
  - `posts/{postId}/comments/{commentId}`

See `API_SUMMARY.md` for full field schemas.

## Storage layout
```
users/{filename}   → profile & cover images
posts/{filename}   → post images
chats/{filename}   → in-chat images
```

## Cloud Messaging (prepared)
`firebase_messaging` is a dependency and `main.dart` contains scaffolded handlers
for:
- `FirebaseMessaging.onMessage` (foreground)
- `FirebaseMessaging.onMessageOpenedApp` (tap-to-open)
- `FirebaseMessaging.onBackgroundMessage` (background)

These blocks are currently **commented out**, alongside a `getToken()` call. The
in-app notifications screen is live. FCM is therefore described as *prepared*.

## Deployment notes
- Provide platform config files: `google-services.json` (Android) and
  `GoogleService-Info.plist` (iOS).
- Configure Firebase project: enable Email/Password auth, create Firestore in the
  desired region, enable Storage.
- Add **Firestore & Storage Security Rules** before going live (see `SECURITY.md`).
- Configure **App Check** providers (Play Integrity / App Attest / reCAPTCHA).
