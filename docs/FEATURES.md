# Tweety — Features

Every feature below maps to real code in `lib/`. Grouped by module.

## 1. Onboarding (`modules/On_boarding/onboarding.dart`)
- Multi-page intro carousel introducing the Tweety brand and mascot.
- Page indicator via `smooth_page_indicator`.
- "Skip" and "next" navigation into the auth flow.

## 2. Authentication
**Login** (`modules/login/`)
- Email & password sign-in via `FirebaseAuth.signInWithEmailAndPassword`.
- Password show/hide toggle (`changeEyePass`).
- Loading / success / error states via `SoicalLoginCubit`.

**Register** (`modules/Register/`)
- Account creation via `FirebaseAuth.createUserWithEmailAndPassword`.
- On success, a user document is written to the `users` Firestore collection with
  default avatar, cover and bio (`usercreate`).
- Password visibility toggle.

**Email verification** (`modules/Social/VerifyEmail/`, `validEmail/`)
- `isEmailverified` flag on the user model.
- Dedicated "verify your email" screen with a send/resend action.

**Session**
- On launch, a cached `uId` (via `CacheHelper` / `shared_preferences`) decides
  whether to open the feed (`SocialLayout`) or the login screen.
- `signout()` clears the cached `uId` and returns to login.

## 3. News Feed (`modules/Social/feeds/`)
- Loads all posts from the `posts` collection (`getPost`).
- Each post shows author name, avatar, timestamp, text and optional image.
- Live like counts and comment counts per post (from sub-collections).
- Pull-to-refresh style reload (`getReload`).

## 4. Create Post (`modules/Social/addpost/`)
- Compose text + optional image picked from the gallery (`getPostImage`).
- Image uploaded to Firebase Storage under `posts/` (`uploadPostImage`).
- Post document written to Firestore (`createPost`).

## 5. Likes
- `likePost(postId)` writes a like document into the post's `likes` sub-collection
  keyed by the current user's `uId`.
- Like totals are counted when loading the feed.

## 6. Comments (`modules/Social/Dialogecomment/`, `Wall_Comment/`)
- Comment dialog to add a comment (`addCommentToPost`).
- Comments stored in each post's `comments` sub-collection with author, avatar,
  text and time.
- Fetch comments (`getcomment`) and delete own comment (`deleteComment`).

## 7. Direct Messaging (`modules/Social/chats/`, `chatdetails/`)
- One-to-one real-time chat using Firestore snapshot streams (`getmesage`).
- Messages mirrored to **both** participants' chat sub-collections (`sendMessage`).
- Send text and images (`uploadImageToChat`, images stored under `chats/`).
- Auto-scroll to the latest message (`scrollToBottom`).

## 8. Users & Search (`modules/Social/users/`, `search/`, `visit_Profile/`)
- Users directory listing every member (`getAlluser`), excluding self.
- Search people and open their profile.
- Visit another user's profile and their posts.

## 9. Profile (`modules/Social/profile/`, `edit/`)
- View own profile: avatar, cover, name, bio, post count, followers/following UI.
- Edit profile with avatar upload (`uploadProfileImage`) and cover upload
  (`coverProfileImage`) to Firebase Storage.
- Name/photo changes propagate to the user's existing posts
  (`updateUserNameInPosts`).
- "Subscribe" toggle button state (`changeButtonSubscrib`).

## 10. Notifications (`modules/Social/notifications/`)
- In-app notifications screen.
- Firebase Cloud Messaging included in the stack; foreground/background/opened
  handlers are scaffolded in `main.dart` (currently commented) — **prepared**.

## 11. System & UX
- **Connectivity:** checked at launch via `connectivity_plus`; a dedicated
  no-internet screen (`modules/internet/`) is shown when offline.
- **Theming:** light and dark `ThemeData` defined in `shared/styles/themes.dart`.
- **Feedback:** toasts via `fluttertoast` and `flutter_flushbar`.
- **State observability:** a global `MyBlocObserver` logs all Cubit transitions.

## Feature status legend
- ✅ **Live** — fully implemented and reachable in the running app.
- 🧩 **Prepared** — present in the stack / scaffolded in code, not fully wired:
  Firebase Messaging handlers, dark-mode activation, local SQL (sqflite/sqlite3),
  Dio REST endpoints.
