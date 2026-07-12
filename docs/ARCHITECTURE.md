# Tweety — Architecture

## Overview

Tweety follows a **layered, reactive architecture**: a Flutter presentation layer
driven by **BLoC/Cubit** state, talking to **Firebase** and local services through
thin helpers.

```
┌─────────────────────────────────────────────────────────┐
│  Presentation (Widgets / Screens)                        │
│  Onboarding · Feed · Chats · AddPost · Users · Profile   │
│  Search · Notifications · Login · Register · Offline     │
└───────────────┬──────────────────────────▲──────────────┘
                │ dispatch (methods)        │ state (BlocConsumer)
┌───────────────▼──────────────────────────┴──────────────┐
│  State (Cubits)                                          │
│  Socialcubit · Maincubit(theme) · LoginCubit ·          │
│  RegisterCubit    +   MyBlocObserver (global logging)    │
└───────────────┬──────────────────────────▲──────────────┘
                │                           │
┌───────────────▼──────────────────────────┴──────────────┐
│  Services / Helpers                                      │
│  DioHelper · CacheHelper · Connectivity · ImagePicker    │
└───────────────┬──────────────────────────▲──────────────┘
                │                           │
┌───────────────▼──────────────────────────┴──────────────┐
│  Backend — Firebase                                      │
│  Auth · Cloud Firestore · Storage · App Check · FCM      │
└─────────────────────────────────────────────────────────┘
```

## App bootstrap (`main.dart`)
1. `WidgetsFlutterBinding.ensureInitialized()`
2. `Firebase.initializeApp()`
3. `FirebaseAppCheck.instance.activate()`
4. `DioHelper.init()` and `await CacheHelper.init()`
5. `Bloc.observer = MyBlocObserver()`
6. Check connectivity (`connectivity_plus`)
7. Read cached `uId` → choose start widget (`SocialLayout` vs `Login`)
8. `runApp(ShopApp(...))` with `MultiBlocProvider` providing `Maincubit` and
   `Socialcubit`. `Socialcubit` eagerly calls `getuserrData()`, `getPost()`,
   `getcomment()`.

## State management
- **Cubit** (a lightweight BLoC) per concern. `Socialcubit` is the primary
  orchestrator (user data, feed, posts, likes, comments, chats, profile media).
- UI subscribes with `BlocConsumer` / `BlocBuilder`; Cubits `emit` granular states
  (loading / success / error) that the UI reacts to.
- `MyBlocObserver` logs every `onChange` / `onTransition` for observability.

## Navigation
- Root `MaterialApp` with `themeMode: light`, `lightTheme` and `darkTheme` defined.
- `SocialLayout` hosts a fixed bottom navigation bar switching between five
  screens: **Feed, Chats, Add Post, Users, Profile** (`changeBottom`).
- `Directionality` wraps the app to set text direction.

## Data flow example — creating a post
```
AddPost screen
   → cubit.getPostImage()            (ImagePicker → File)
   → cubit.uploadPostImage(text)     (File → Firebase Storage → download URL)
   → cubit.createPost(url, text)     (write doc → posts collection)
   → cubit.getPost()                 (reload feed)
   → emit(SocialGetPostSuccesststate)
   → BlocConsumer rebuilds the feed
```

## Data flow example — real-time chat
```
ChatDetails screen
   → cubit.getmesage(receiveId)      (Firestore snapshots stream)
   → messages list updates live      (emit success)
   → cubit.sendMessage(...)          (write to BOTH inboxes)
   → scrollToBottom()
```

## Design principles observed
- **Separation by module** — each feature lives in its own folder under
  `modules/Social/`.
- **Models own (de)serialisation** — `fromjason` / `toMap` on each model.
- **Helpers isolate infrastructure** — `DioHelper`, `CacheHelper`.
- **Ownership by identity** — mutations are scoped to the signed-in `uId`.
