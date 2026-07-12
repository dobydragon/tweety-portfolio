# Tweety — Tech Stack

Detected directly from `pubspec.yaml`.

## Runtime
- **Flutter** (Material Design UI toolkit)
- **Dart** SDK `>=3.0.6 <4.0.0`
- App version `1.0.0+1`

## Firebase
| Package | Version | Purpose |
|---------|---------|---------|
| `firebase_core` | ^2.24.2 | Firebase initialisation |
| `firebase_auth` | ^4.15.1 | Email/password authentication |
| `cloud_firestore` | ^4.13.3 | Real-time NoSQL database |
| `firebase_storage` | ^11.5.6 | Media (images) storage |
| `firebase_app_check` | ^0.2.1+8 | Backend abuse protection |
| `firebase_messaging` | ^14.7.9 | Push notifications (prepared) |

## State management
- `flutter_bloc` ^8.1.3 / `bloc` ^8.1.2 — Cubit pattern
- Global `BlocObserver` for transition logging

## Networking
- `dio` ^5.3.3 — HTTP client (REST helper + endpoints, prepared)
- `http` ^0.13.3 (dev) — auxiliary HTTP
- `connectivity_plus` — network status monitoring

## Local storage
- `shared_preferences` ^2.2.2 — session/theme cache (`CacheHelper`)
- `sqflite` ^2.3.0 / `sqlite3` ^2.1.0 — local SQL (in stack)

## UI & media
- `image_picker` ^1.0.5 — gallery image selection
- `carousel_slider` ^4.2.1 — carousels
- `smooth_page_indicator` ^1.1.0 — onboarding dots
- `font_awesome_flutter`, `eva_icons_flutter`, `community_material_icon` — icons
- `fluttertoast` ^8.2.2, `flutter_flushbar` — toasts / snackbars
- `hexcolor` ^3.0.1 — hex color parsing
- `intl` ^0.18.1 — date/time formatting
- `cupertino_icons`, `after_layout`
- `webview_flutter` ^2.0.13 (dev)

## Dev / tooling
- `flutter_lints` ^2.0.0
- `flutter_test`

## Directory layout (`lib/`)
```
lib/
├── main.dart               # bootstrap: Firebase, App Check, Dio, cache, providers
├── layout/                 # SocialLayout — bottom-nav shell
├── models/                 # SocialUser, Post, Message, Comment, DataLogin
├── modules/
│   ├── On_boarding/        # intro carousel
│   ├── login/  Register/   # auth + cubits
│   ├── internet/           # offline screen
│   └── Social/             # feeds, chats, addpost, profile, users, search,
│                           # notifications, comments, visit_profile, verify email
└── shared/
    ├── cubit/              # Maincubit (theme), BlocObserver
    ├── network/            # DioHelper (remote), CacheHelper (local), endpoints
    ├── styles/             # colors.dart, themes.dart (light + dark)
    ├── components/         # shared widgets/helpers
    └── constant/           # constants (uId, token, signout)
```
