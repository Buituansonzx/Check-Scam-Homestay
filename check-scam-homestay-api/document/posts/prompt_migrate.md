# PROMPT: Tạo migration cho table post_type, posts, post_images, comments, comment_images

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
  - is_anonymous: boolean default false -> có ẩn danh không
  - views: int default 0 -> số lượt xem
  - likes: int default 0 -> số lượt thích
  - timestamps
  - deleted_at: timestamp nullable -> soft delete

Indexes:
  - PK: id
  - INDEX: object_id, post_type_id, user_id, is_anonymous
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

---

## Business Rules

### post_types

- name phải unique
- Soft delete để giữ lịch sử

### posts

- object_id bắt buộc (liên kết với homestay/saller)
- user_id nullable: cho phép admin tạo post
- is_anonymous = true: ẩn thông tin user khi hiển thị
- views, likes >= 0

### post_images & comment_images

- file_size > 0
- mime_type phải bắt đầu với 'image/'
- Chỉ có 1 ảnh is_primary = true cho mỗi post (post_images)
- order >= 0
- variants format JSON:
    ```json
    {
        "thumbnail": { "path": "...", "width": 150, "height": 150 },
        "medium": { "path": "...", "width": 800, "height": 600 },
        "large": { "path": "...", "width": 1920, "height": 1080 }
    }
    ```

### comments

- parent_id nullable: null = comment gốc, có giá trị = reply
- Hỗ trợ nested comments (comment con)
- is_anonymous = true: ẩn thông tin user

---

## Relationships

### post_types

- Has Many: posts (1-N)

### posts

- Belongs To: objects (N-1, nullable)
- Belongs To: users (N-1, nullable)
- Belongs To: post_types (N-1, nullable)
- Has Many: post_images (1-N)
- Has Many: comments (1-N)

### post_images

- Belongs To: posts (N-1)

### comments

- Belongs To: posts (N-1)
- Belongs To: users (N-1, nullable)
- Belongs To: comments (parent) (N-1, nullable) -> self-referencing
- Has Many: comments (children) (1-N) -> self-referencing
- Has Many: comment_images (1-N)

### comment_images

- Belongs To: comments (N-1)

---

## S3 Configuration

### Environment Variables

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=ap-southeast-1
AWS_BUCKET=check-scam-homestay-images
AWS_URL=
AWS_ENDPOINT=
AWS_USE_PATH_STYLE_ENDPOINT=false
```

### S3 Fields Explanation

- **file_path**: Đường dẫn tương đối trong bucket (e.g., `posts/2026/02/abc123.jpg`)
- **s3_bucket**: Tên bucket (e.g., `check-scam-homestay-images`)
- **s3_region**: AWS region (e.g., `ap-southeast-1`)
- **s3_url**: URL đầy đủ (e.g., `https://s3.ap-southeast-1.amazonaws.com/bucket/path`)
- **cdn_url**: URL qua CDN (e.g., `https://cdn.example.com/path`)

---

## Migration Order

```
1. post_types
2. posts (depends on: objects, users, post_types)
3. post_images (depends on: posts)
4. comments (depends on: posts, users)
5. comment_images (depends on: comments)
```

---

## Commands

```bash
# Tạo migrations
php artisan make:migration create_post_types_table
php artisan make:migration create_posts_table
php artisan make:migration create_post_images_table
php artisan make:migration create_comments_table
php artisan make:migration create_comment_images_table

# Run migrations
php artisan migrate
```

---

## Use Cases

### Posts

- Tạo bài viết review homestay
- Báo cáo lừa đảo
- Đăng ẩn danh
- Upload nhiều ảnh kèm theo

### Comments

- Bình luận vào bài viết
- Reply bình luận (nested)
- Đăng ẩn danh
- Đính kèm ảnh chứng cứ

### Images (S3)

- Upload ảnh lên S3 tự động
- Tạo variants (thumbnail, medium, large)
- Serve qua CloudFront CDN
- Tự động xóa khi xóa post/comment

---

## Notes

- Sử dụng Laravel Filesystem với S3 driver
- Nên implement queue job để xử lý upload/resize ảnh
- Soft delete cho tất cả bảng để giữ lịch sử
- Nested comments: tối đa 3 cấp để tránh phức tạp
