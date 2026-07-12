# Tweety — Data & API Summary

Tweety's live data layer is **Cloud Firestore + Firebase Storage + Firebase Auth**.
A `Dio`-based REST client and endpoint constants are also present in the codebase
(prepared, not the primary data path).

## Authentication (Firebase Auth)
| Operation | Call |
|-----------|------|
| Register | `createUserWithEmailAndPassword(email, password)` |
| Login | `signInWithEmailAndPassword(email, password)` |
| Sign out | clear cached `uId` (`CacheHelper.removeData`) |
| Email verification | `isEmailverified` flag + verify-email screen |

## Firestore data model

### `users/{uId}`
```jsonc
{
  "uId": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "password": "string",
  "isEmailverified": false,
  "image":  "avatar URL",
  "cover":  "cover URL",
  "bio":    "string"
}
```
Sub-collections:
- `users/{uId}/chats/{otherUId}/messages/{messageId}`

### `posts/{postId}`
```jsonc
{
  "uId": "author id",
  "name": "author name",
  "image": "author avatar URL",
  "text": "post body",
  "dataTime": "timestamp string",
  "postImage": "image URL | 'No upload Image'"
}
```
Sub-collections:
- `posts/{postId}/likes/{uId}` → `{ "like": true }`
- `posts/{postId}/comments/{commentId}`

### `messages` (chat message)
```jsonc
{
  "senderID":  "uId",
  "receiveID": "uId",
  "text":      "string",
  "dateTime":  "timestamp string",
  "chatImage": "image URL | 'No upload Image'"
}
```

### `comments`
```jsonc
{
  "nameWritComment": "author name",
  "datetimecomment": "timestamp string",
  "textComment":     "string",
  "uId":             "author id",
  "image":           "author avatar URL"
}
```

## Key Firestore operations (from `Socialcubit`)
| Purpose | Operation |
|---------|-----------|
| Load current user | `users.doc(uId).get()` |
| Load all users | `users.get()` |
| Load feed | `posts.get()` (+ likes/comments counts) |
| Load own posts | `posts.where('uId'==uId).orderBy('dataTime').snapshots()` |
| Create post | `posts.add(post.toMap())` |
| Like | `posts/{id}/likes.doc(uId).set({like:true})` |
| Add comment | `posts/{id}/comments.add(comment.toMap())` |
| Delete comment | `posts/{id}/comments.doc(commentId).delete()` |
| Send message | write to both users' `chats/{other}/messages` |
| Stream messages | `...messages.orderBy('dateTime').snapshots()` |
| Update profile | `users.doc(uId).update(model.toMap())` |

## Firebase Storage buckets (paths)
- `users/{filename}` — profile & cover images
- `posts/{filename}` — post images
- `chats/{filename}` — in-chat images

## REST layer (prepared)
`shared/network/remote/dio_helper.dart` + `endpoint/end_point.dart` define a Dio
client and endpoint constants (`login`, `register`, `home`, `profile`,
`products/search`, …). These are **scaffolded for a REST backend** but the running
app uses Firebase. Described honestly as *prepared*.
