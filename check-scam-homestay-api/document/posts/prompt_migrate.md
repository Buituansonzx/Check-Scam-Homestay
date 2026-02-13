# PROMPT: Tạo migration cho table post_type, posts, post_images, comments, comment_images

post_type :

- tên migrate : create_post_types_table
- tên file : post_types

posts :

- tên migrate : create_posts_table
- tên file : posts

post_images :

- tên migrate : create_post_images_table
- tên file : post_images

comments :

- tên migrate : create_comments_table
- tên file : comments

comment_images :

- tên migrate : create_comment_images_table
- tên file : comment_images

## Context

- Project: Check Scam Homestay
- Database: MySQL 8.0, UUID primary keys

## Task

Tạo migration cho table `post_types` - lưu thông tin loại bài viết
Tạo migration cho table `posts` - lưu thông tin bài viết
Tạo migration cho table `post_images` - lưu thông tin ảnh bài viết sử dụng S3 của AWS
Tạo migration cho table `comments` - lưu thông tin bình luận của bài viết
Tạo migration cho table `comment_images` - lưu thông tin ảnh bình luận sử dụng S3 của AWS

---

## Schema

### 1. post_types

```
post_types:
  - id: UUID PK
  - name: string(255) NOT NULL -> tên loại bài viết
  - description: text nullable -> mô tả
  - code: string(50) NOT NULL -> mã loại bài viết
  - timestamps
  - deleted_at: timestamp nullable -> soft delete

Indexes:
  - PK: id
  - UNIQUE: name
```

### 2. posts

```
posts:
  - id: UUID PK
  - object_id: UUID FK nullable -> objects.id (ON DELETE CASCADE)
  - user_id: UUID FK nullable -> users.id (ON DELETE SET NULL)
  - post_type_id: UUID FK nullable -> post_types.id (ON DELETE SET NULL)
  - title: string(255) NOT NULL -> tiêu đề
  - content: text NOT NULL -> nội dung
  - amount_of_money_scammed: decimal(15,2) nullable -> số tiền bị lừa đảo (VND)
  - is_anonymous: boolean default false -> có ẩn danh không
  - views: int default 0 -> số lượt xem
  - likes: int default 0 -> số lượt thích
  - timestamps
  - deleted_at: timestamp nullable -> soft delete

Indexes:
  - PK: id
  - INDEX: object_id, post_type_id, user_id, is_anonymous, amount_of_money_scammed
  - FULLTEXT: title, content
  - FK: object_id -> objects(id) ON DELETE CASCADE
  - FK: user_id -> users(id) ON DELETE SET NULL
  - FK: post_type_id -> post_types(id) ON DELETE SET NULL
```

### 3. post_images (với S3)

```
post_images:
  - id: UUID PK
  - post_id: UUID FK nullable -> posts.id (ON DELETE CASCADE)
  - file_path: string(500) NOT NULL -> đường dẫn file trên S3 (key)
  - file_name: string(255) NOT NULL -> tên file gốc
  - amount_of_money_scammed: decimal(10,2) NOT NULL -> số tiền bị lừa đảo
  - file_size: bigint NOT NULL -> kích thước file (bytes)
  - mime_type: string(100) NOT NULL -> loại MIME (image/jpeg, image/png, etc.)
  - disk: string(50) default 's3' -> storage disk name
  - width: int nullable -> chiều rộng ảnh (pixels)
  - height: int nullable -> chiều cao ảnh (pixels)
  - variants: json nullable -> các biến thể ảnh (thumbnail, medium, large)
  - s3_bucket: string(100) nullable -> tên S3 bucket
  - s3_region: string(50) nullable -> AWS region (ap-southeast-1, etc.)
  - s3_url: string(500) nullable -> URL đầy đủ trên S3
  - cdn_url: string(500) nullable -> URL qua CloudFront/CDN
  - is_primary: boolean default false -> ảnh đại diện bài viết
  - order: int default 0 -> thứ tự hiển thị
  - alt_text: string(255) nullable -> mô tả ảnh (SEO)
  - timestamps
  - deleted_at: timestamp nullable -> soft delete


Indexes:
  - PK: id
  - INDEX: post_id, is_primary, order
  - FK: post_id -> posts(id) ON DELETE CASCADE
```

### 4. comments

```
comments:
  - id: UUID PK
  - post_id: UUID FK nullable -> posts.id (ON DELETE CASCADE)
  - user_id: UUID FK nullable -> users.id (ON DELETE SET NULL)
  - parent_id: UUID FK nullable -> comments.id (ON DELETE CASCADE) -> bình luận cha (nested comments)
  - content: text NOT NULL -> nội dung bình luận
  - is_anonymous: boolean default false -> có ẩn danh không
  - likes: int default 0 -> số lượt thích
  - timestamps
  - deleted_at: timestamp nullable -> soft delete

Indexes:
  - PK: id
  - INDEX: post_id, user_id, parent_id, is_anonymous
  - FK: post_id -> posts(id) ON DELETE CASCADE
  - FK: user_id -> users(id) ON DELETE SET NULL
  - FK: parent_id -> comments(id) ON DELETE CASCADE
```

### 5. comment_images (với S3)

```
comment_images:
  - id: UUID PK
  - comment_id: UUID FK nullable -> comments.id (ON DELETE CASCADE)
  - file_path: string(500) NOT NULL -> đường dẫn file trên S3 (key)
  - file_name: string(255) NOT NULL -> tên file gốc
  - file_size: bigint NOT NULL -> kích thước file (bytes)
  - mime_type: string(100) NOT NULL -> loại MIME (image/jpeg, image/png, etc.)
  - disk: string(50) default 's3' -> storage disk name
  - width: int nullable -> chiều rộng ảnh (pixels)
  - height: int nullable -> chiều cao ảnh (pixels)
  - variants: json nullable -> các biến thể ảnh (thumbnail, medium, large)
  - s3_bucket: string(100) nullable -> tên S3 bucket
  - s3_region: string(50) nullable -> AWS region (ap-southeast-1, etc.)
  - s3_url: string(500) nullable -> URL đầy đủ trên S3
  - cdn_url: string(500) nullable -> URL qua CloudFront/CDN
  - order: int default 0 -> thứ tự hiển thị
  - alt_text: string(255) nullable -> mô tả ảnh (SEO)
  - timestamps
  - deleted_at: timestamp nullable -> soft delete

Indexes:
  - PK: id
  - INDEX: comment_id, order
  - FK: comment_id -> comments(id) ON DELETE CASCADE
```
