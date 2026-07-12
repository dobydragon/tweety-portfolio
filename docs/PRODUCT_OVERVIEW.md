# Tweety — Product Overview

> A real-time social networking mobile app built with Flutter and Firebase.

## What Tweety is

Tweety is a cross-platform social networking application. It lets people create an
account, personalise a profile, share posts (text and photos) to a shared news
feed, engage through likes and comments, and hold private one-to-one
conversations in real time.

The app is written once in Flutter/Dart and targets Android and iOS (with build
scaffolding also present for web, macOS, Windows and Linux). All backend concerns
— authentication, data, media storage, abuse protection and messaging — are
handled by Firebase.

## The problem it solves

Modern social apps are often heavy and cluttered. Tweety focuses on the core loop
of social interaction — **post → react → discuss → message** — in a clean, fast,
themed interface, while remaining a maintainable, well-structured codebase.

## Who it's for

- **Communities** that want a lightweight, self-contained social feed and chat.
- **Members** who want to share updates, follow conversations and message peers.
- **Developers / clients** evaluating a compact, production-shaped Flutter +
  Firebase reference application.

## Core capabilities

| Area | Capability |
|------|-----------|
| Onboarding | Guided intro carousel with page indicator |
| Auth | Email/password register & login, password toggle, email verification |
| Feed | Shared timeline of posts with author, avatar, time, text & image |
| Engagement | Likes and threaded comments (add / delete own) |
| Messaging | Real-time one-to-one chat with text and image messages |
| People | Users directory, search, visit profile |
| Profile | Avatar, cover, name, bio; edits propagate to your posts |
| System | Connectivity awareness, offline screen, light & dark themes |
| Security | Firebase Authentication, App Check, ownership-scoped mutations |

## Platforms

- **Primary:** Android, iOS (Flutter)
- **Present in repo:** web, macOS, Windows, Linux build folders

## Honesty note on prepared features

Some capabilities are **included in the stack and prepared in code** but not fully
wired as live experiences:

- **Firebase Cloud Messaging** — dependency present, handlers scaffolded in
  `main.dart` (currently commented), plus a live in-app notifications screen.
- **Dark theme** — fully defined; the app currently launches in light mode.
- **Local SQL (sqflite / sqlite3) & Dio REST endpoints** — present in the stack;
  the running data layer is Firebase/Firestore.

These are described as *prepared* throughout the portfolio, never as live.

## Version

- App version: `1.0.0+1` (from `pubspec.yaml`)
- Dart SDK: `>=3.0.6 <4.0.0`
