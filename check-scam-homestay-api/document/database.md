# 🗄️ Database Schema - Check Scam Homestay

> **Mục đích**: Tài liệu cấu trúc database cho hệ thống kiểm tra và báo cáo homestay lừa đảo
>
> **Ngày cập nhật**: 2026-02-08
>
> **Database**: MySQL 8.0
>
> **Framework**: Laravel 11 + Apiato

---

## 📊 Tổng quan Database

### Tech Stack

- **Database**: MySQL 8.0
- **Primary Keys**: UUID (không dùng auto-increment)
- **Storage**: AWS S3 (cho images)
- **Framework**: Laravel 11 + Apiato

---

## 📋 Danh sách Tables

### Core Tables (5 bảng)

| #   | Tên Table         | Mô tả                             | Migration File             |
| --- | ----------------- | --------------------------------- | -------------------------- |
| 1   | **users**         | Người dùng hệ thống               | Built-in Apiato            |
| 2   | **homes**         | Thông tin homestay/nhà trọ        | create_homes_table         |
| 3   | **sallers**       | Người bán/môi giới                | create_sallers_table       |
| 4   | **object_groups** | Nhóm thông tin liên lạc           | create_object_groups_table |
| 5   | **objects**       | Thông tin liên lạc & Social links | create_objects_table       |

### Posts Module (5 bảng)

| #   | Tên Table          | Mô tả                   | Migration File              |
| --- | ------------------ | ----------------------- | --------------------------- |
| 5   | **post_types**     | Loại bài viết           | create_post_types_table     |
| 6   | **posts**          | Bài viết/Review/Báo cáo | create_posts_table          |
| 7   | **post_images**    | Ảnh bài viết (S3)       | create_post_images_table    |
| 8   | **comments**       | Bình luận               | create_comments_table       |
| 9   | **comment_images** | Ảnh bình luận (S3)      | create_comment_images_table |

---

## 🏗️ Chi tiết Schema

### 1. Table: users (Built-in Apiato)

| Tên Cột           | Kiểu Dữ Liệu | Ràng Buộc        | Mô Tả                    |
| ----------------- | ------------ | ---------------- | ------------------------ |
| id                | UUID         | PK               | ID người dùng            |
| name              | VARCHAR(255) | NOT NULL         | Tên người dùng           |
| email             | VARCHAR(255) | UNIQUE, NOT NULL | Email đăng nhập          |
| password          | VARCHAR(255) | NOT NULL         | Mật khẩu (hashed)        |
| gender            | ENUM         | NULLABLE         | Giới tính                |
| birth             | DATE         | NULLABLE         | Ngày sinh                |
| email_verified_at | TIMESTAMP    | NULLABLE         | Thời gian xác thực email |
| created_at        | TIMESTAMP    | AUTO             | Thời gian tạo            |
| updated_at        | TIMESTAMP    | AUTO             | Thời gian cập nhật       |

**Indexes:**

- Primary Key: `id`
- Unique: `email`

**Relationships:**

- Has Many → `sallers` (1-N)
- Has Many → `posts` (1-N)
- Has Many → `comments` (1-N)

---

### 2. Table: homes

| Tên Cột       | Kiểu Dữ Liệu | Ràng Buộc     | Mô Tả                     |
| ------------- | ------------ | ------------- | ------------------------- |
| id            | UUID         | PK            | ID homestay               |
| name          | VARCHAR(255) | NOT NULL      | Tên homestay              |
| phone         | VARCHAR(20)  | NULLABLE      | SĐT ngắn (0987654321)     |
| phone_full    | VARCHAR(20)  | NULLABLE      | SĐT đầy đủ (+84987654321) |
| bank_account  | VARCHAR(50)  | NULLABLE      | Số tài khoản ngân hàng    |
| link_facebook | VARCHAR(500) | NULLABLE      | URL Facebook              |
| link_tiktok   | VARCHAR(500) | NULLABLE      | URL Tiktok                |
| link_zalo     | VARCHAR(500) | NULLABLE      | URL Zalo                  |
| link_website  | VARCHAR(500) | NULLABLE      | URL Website               |
| link_other    | VARCHAR(500) | NULLABLE      | URL khác                  |
| address       | VARCHAR(500) | NULLABLE      | Địa chỉ                   |
| description   | TEXT         | NULLABLE      | Mô tả chi tiết            |
| latitude      | VARCHAR(50)  | NULLABLE      | Vĩ độ GPS                 |
| longitude     | VARCHAR(50)  | NULLABLE      | Kinh độ GPS               |
| rating        | DECIMAL(3,2) | DEFAULT 0.00  | Đánh giá (0-5)            |
| is_scam       | BOOLEAN      | DEFAULT false | Trạng thái lừa đảo        |
| is_confirmed  | BOOLEAN      | DEFAULT false | Đã xác thực               |
| followers     | INT          | DEFAULT 0     | Số người theo dõi         |
| created_at    | TIMESTAMP    | AUTO          | Thời gian tạo             |
| updated_at    | TIMESTAMP    | AUTO          | Thời gian cập nhật        |

**Indexes:**

- Primary Key: `id`
- Index: `is_scam`, `is_confirmed`, `rating`
- FULLTEXT: `name`, `description`

**Relationships:**

- Has Many → `objects` (1-N)

---

### 3. Table: sallers

| Tên Cột       | Kiểu Dữ Liệu  | Ràng Buộc              | Mô Tả                     |
| ------------- | ------------- | ---------------------- | ------------------------- |
| id            | UUID          | PK                     | ID người bán              |
| user_id       | UUID          | FK NULLABLE → users.id | Liên kết với user account |
| deposit       | DECIMAL(15,2) | DEFAULT 0.00           | Tiền cọc                  |
| avatar        | VARCHAR(500)  | NULLABLE               | URL ảnh đại diện          |
| name          | VARCHAR(255)  | NOT NULL               | Tên người bán             |
| email         | VARCHAR(255)  | UNIQUE NULLABLE        | Email liên hệ             |
| phone         | VARCHAR(20)   | NULLABLE               | SĐT ngắn (0987654321)     |
| phone_full    | VARCHAR(20)   | NULLABLE               | SĐT đầy đủ (+84987654321) |
| bank_account  | VARCHAR(50)   | NULLABLE               | Số tài khoản ngân hàng    |
| link_facebook | VARCHAR(500)  | NULLABLE               | URL Facebook              |
| link_tiktok   | VARCHAR(500)  | NULLABLE               | URL Tiktok                |
| link_zalo     | VARCHAR(500)  | NULLABLE               | URL Zalo                  |
| link_website  | VARCHAR(500)  | NULLABLE               | URL Website               |
| link_other    | VARCHAR(500)  | NULLABLE               | URL khác                  |
| order         | INT           | DEFAULT 0              | Thứ tự hiển thị           |
| is_scam       | BOOLEAN       | DEFAULT false          | Trạng thái lừa đảo        |
| created_at    | TIMESTAMP     | AUTO                   | Thời gian tạo             |
| updated_at    | TIMESTAMP     | AUTO                   | Thời gian cập nhật        |

**Indexes:**

- Primary Key: `id`
- Index: `user_id`, `is_scam`, `order`, `phone`, `email`
- Foreign Key: `user_id` → `users(id)` ON DELETE SET NULL

**Relationships:**

- Belongs To → `users` (N-1, nullable)
- Has Many → `objects` (1-N)

- Has Many → `object_groups` (1-N)

---

### 4. Table: object_groups

| Tên Cột       | Kiểu Dữ Liệu | Ràng Buộc                | Mô Tả                     |
| ------------- | ------------ | ------------------------ | ------------------------- |
| id            | UUID         | PK                       | ID nhóm                   |
| name          | VARCHAR(255) | NOT NULL                 | Tên nhóm                  |
| description   | TEXT         | NULLABLE                 | Mô tả nhóm                |
| home_id       | UUID         | FK NULLABLE → homes.id   | Liên kết với homestay     |
| saller_id     | UUID         | FK NULLABLE → sallers.id | Liên kết với người bán    |
| phone         | VARCHAR(20)  | NULLABLE                 | SĐT ngắn (0987654321)     |
| phone_full    | VARCHAR(20)  | NULLABLE                 | SĐT đầy đủ (+84987654321) |
| bank_account  | VARCHAR(50)  | NULLABLE                 | Số tài khoản ngân hàng    |
| link_facebook | VARCHAR(500) | NULLABLE                 | URL Facebook              |
| link_tiktok   | VARCHAR(500) | NULLABLE                 | URL Tiktok                |
| link_zalo     | VARCHAR(500) | NULLABLE                 | URL Zalo                  |
| link_website  | VARCHAR(500) | NULLABLE                 | URL Website               |
| link_other    | VARCHAR(500) | NULLABLE                 | URL khác                  |
| is_scam       | BOOLEAN      | DEFAULT false            | Trạng thái lừa đảo        |
| created_at    | TIMESTAMP    | AUTO                     | Thời gian tạo             |
| updated_at    | TIMESTAMP    | AUTO                     | Thời gian cập nhật        |

**Indexes:**

- Primary Key: `id`
- Index: `home_id`, `saller_id`, `phone`, `phone_full`, `bank_account`
- Foreign Key: `home_id` → `homes(id)` ON DELETE CASCADE
- Foreign Key: `saller_id` → `sallers(id)` ON DELETE CASCADE

**Relationships:**

- Belongs To → `homes` (N-1, nullable)
- Belongs To → `sallers` (N-1, nullable)
- Has Many → `objects` (1-N)

---

### 5. Table: objects

| Tên Cột         | Kiểu Dữ Liệu | Ràng Buộc                      | Mô Tả                     |
| --------------- | ------------ | ------------------------------ | ------------------------- |
| id              | UUID         | PK                             | ID object                 |
| home_id         | UUID         | FK NULLABLE → homes.id         | Liên kết với homestay     |
| saller_id       | UUID         | FK NULLABLE → sallers.id       | Liên kết với người bán    |
| object_group_id | UUID         | FK NULLABLE → object_groups.id | Liên kết với nhóm         |
| phone           | VARCHAR(20)  | NULLABLE                       | SĐT ngắn (0987654321)     |
| phone_full      | VARCHAR(20)  | NULLABLE                       | SĐT đầy đủ (+84987654321) |
| bank_account    | VARCHAR(50)  | NULLABLE                       | Số tài khoản ngân hàng    |
| link_facebook   | VARCHAR(500) | NULLABLE                       | URL Facebook              |
| link_tiktok     | VARCHAR(500) | NULLABLE                       | URL Tiktok                |
| link_zalo       | VARCHAR(500) | NULLABLE                       | URL Zalo                  |
| link_website    | VARCHAR(500) | NULLABLE                       | URL Website               |
| link_other      | VARCHAR(500) | NULLABLE                       | URL khác                  |
| is_scam         | BOOLEAN      | DEFAULT false                  | Trạng thái lừa đảo        |
| created_at      | TIMESTAMP    | AUTO                           | Thời gian tạo             |
| updated_at      | TIMESTAMP    | AUTO                           | Thời gian cập nhật        |

**Indexes:**

- Primary Key: `id`
- Index: `home_id`, `saller_id`, `object_group_id`, `phone`, `phone_full`, `bank_account`
- Foreign Key: `home_id` → `homes(id)` ON DELETE CASCADE
- Foreign Key: `saller_id` → `sallers(id)` ON DELETE CASCADE
- Foreign Key: `object_group_id` → `object_groups(id)` ON DELETE CASCADE

**Relationships:**

- Belongs To → `homes` (N-1, nullable)
- Belongs To → `sallers` (N-1, nullable)
- Belongs To → `object_groups` (N-1, nullable)
- Has Many → `posts` (1-N)

---

### 6. Table: post_types

| Tên Cột     | Kiểu Dữ Liệu | Ràng Buộc        | Mô Tả              |
| ----------- | ------------ | ---------------- | ------------------ |
| id          | UUID         | PK               | ID loại bài viết   |
| name        | VARCHAR(255) | NOT NULL, UNIQUE | Tên loại bài viết  |
| code        | VARCHAR(50)  | NOT NULL, UNIQUE | Mã loại bài viết   |
| description | TEXT         | NULLABLE         | Mô tả              |
| created_at  | TIMESTAMP    | AUTO             | Thời gian tạo      |
| updated_at  | TIMESTAMP    | AUTO             | Thời gian cập nhật |
| deleted_at  | TIMESTAMP    | NULLABLE         | Soft delete        |

**Indexes:**

- Primary Key: `id`
- Unique: `name`, `code`

**Relationships:**

- Has Many → `posts` (1-N)

---

### 6. Table: posts

| Tên Cột      | Kiểu Dữ Liệu | Ràng Buộc                   | Mô Tả               |
| ------------ | ------------ | --------------------------- | ------------------- |
| id           | UUID         | PK                          | ID bài viết         |
| object_id    | UUID         | FK NULLABLE → objects.id    | Liên kết với object |
| user_id      | UUID         | FK NULLABLE → users.id      | Người tạo bài viết  |
| post_type_id | UUID         | FK NULLABLE → post_types.id | Loại bài viết       |
| title        | VARCHAR(255) | NOT NULL                    | Tiêu đề             |
| content      | TEXT         | NOT NULL                    | Nội dung chi tiết   |
| is_anonymous | BOOLEAN      | DEFAULT false               | Đăng ẩn danh        |
| views        | INT          | DEFAULT 0                   | Số lượt xem         |
| likes        | INT          | DEFAULT 0                   | Số lượt thích       |
| created_at   | TIMESTAMP    | AUTO                        | Thời gian tạo       |
| updated_at   | TIMESTAMP    | AUTO                        | Thời gian cập nhật  |
| deleted_at   | TIMESTAMP    | NULLABLE                    | Soft delete         |

**Indexes:**

- Primary Key: `id`
- Index: `object_id`, `post_type_id`, `user_id`, `is_anonymous`
- FULLTEXT: `title`, `content`
- Foreign Key: `object_id` → `objects(id)` ON DELETE CASCADE
- Foreign Key: `user_id` → `users(id)` ON DELETE SET NULL
- Foreign Key: `post_type_id` → `post_types(id)` ON DELETE SET NULL

**Relationships:**

- Belongs To → `objects` (N-1, nullable)
- Belongs To → `users` (N-1, nullable)
- Belongs To → `post_types` (N-1, nullable)
- Has Many → `post_images` (1-N)
- Has Many → `comments` (1-N)

---

### 7. Table: post_images

| Tên Cột    | Kiểu Dữ Liệu | Ràng Buộc              | Mô Tả                   |
| ---------- | ------------ | ---------------------- | ----------------------- |
| id         | UUID         | PK                     | ID ảnh                  |
| post_id    | UUID         | FK NULLABLE → posts.id | Liên kết với bài viết   |
| file_path  | VARCHAR(500) | NOT NULL               | Đường dẫn file trên S3  |
| file_name  | VARCHAR(255) | NOT NULL               | Tên file gốc            |
| file_size  | BIGINT       | NOT NULL               | Kích thước file (bytes) |
| mime_type  | VARCHAR(100) | NOT NULL               | Loại MIME               |
| disk       | VARCHAR(50)  | DEFAULT 's3'           | Storage disk name       |
| width      | INT          | NULLABLE               | Chiều rộng ảnh (pixels) |
| height     | INT          | NULLABLE               | Chiều cao ảnh (pixels)  |
| variants   | JSON         | NULLABLE               | Các biến thể ảnh        |
| s3_bucket  | VARCHAR(100) | NULLABLE               | Tên S3 bucket           |
| s3_region  | VARCHAR(50)  | NULLABLE               | AWS region              |
| s3_url     | VARCHAR(500) | NULLABLE               | URL đầy đủ trên S3      |
| cdn_url    | VARCHAR(500) | NULLABLE               | URL qua CloudFront/CDN  |
| is_primary | BOOLEAN      | DEFAULT false          | Ảnh đại diện bài viết   |
| order      | INT          | DEFAULT 0              | Thứ tự hiển thị         |
| alt_text   | VARCHAR(255) | NULLABLE               | Mô tả ảnh (SEO)         |
| created_at | TIMESTAMP    | AUTO                   | Thời gian tạo           |
| updated_at | TIMESTAMP    | AUTO                   | Thời gian cập nhật      |
| deleted_at | TIMESTAMP    | NULLABLE               | Soft delete             |

**Indexes:**

- Primary Key: `id`
- Index: `post_id`, `is_primary`, `order`
- Foreign Key: `post_id` → `posts(id)` ON DELETE CASCADE

**Relationships:**

- Belongs To → `posts` (N-1)

---

### 8. Table: comments

| Tên Cột      | Kiểu Dữ Liệu | Ràng Buộc                 | Mô Tả                  |
| ------------ | ------------ | ------------------------- | ---------------------- |
| id           | UUID         | PK                        | ID bình luận           |
| post_id      | UUID         | FK NULLABLE → posts.id    | Liên kết với bài viết  |
| user_id      | UUID         | FK NULLABLE → users.id    | Người bình luận        |
| parent_id    | UUID         | FK NULLABLE → comments.id | Bình luận cha (nested) |
| content      | TEXT         | NOT NULL                  | Nội dung bình luận     |
| is_anonymous | BOOLEAN      | DEFAULT false             | Bình luận ẩn danh      |
| likes        | INT          | DEFAULT 0                 | Số lượt thích          |
| created_at   | TIMESTAMP    | AUTO                      | Thời gian tạo          |
| updated_at   | TIMESTAMP    | AUTO                      | Thời gian cập nhật     |
| deleted_at   | TIMESTAMP    | NULLABLE                  | Soft delete            |

**Indexes:**

- Primary Key: `id`
- Index: `post_id`, `user_id`, `parent_id`, `is_anonymous`
- Foreign Key: `post_id` → `posts(id)` ON DELETE CASCADE
- Foreign Key: `user_id` → `users(id)` ON DELETE SET NULL
- Foreign Key: `parent_id` → `comments(id)` ON DELETE CASCADE

**Relationships:**

- Belongs To → `posts` (N-1)
- Belongs To → `users` (N-1, nullable)
- Belongs To → `comments` (parent) (N-1, nullable) - Self-referencing
- Has Many → `comments` (children) (1-N) - Self-referencing
- Has Many → `comment_images` (1-N)

---

### 9. Table: comment_images

| Tên Cột    | Kiểu Dữ Liệu | Ràng Buộc                 | Mô Tả                   |
| ---------- | ------------ | ------------------------- | ----------------------- |
| id         | UUID         | PK                        | ID ảnh                  |
| comment_id | UUID         | FK NULLABLE → comments.id | Liên kết với bình luận  |
| file_path  | VARCHAR(500) | NOT NULL                  | Đường dẫn file trên S3  |
| file_name  | VARCHAR(255) | NOT NULL                  | Tên file gốc            |
| file_size  | BIGINT       | NOT NULL                  | Kích thước file (bytes) |
| mime_type  | VARCHAR(100) | NOT NULL                  | Loại MIME               |
| disk       | VARCHAR(50)  | DEFAULT 's3'              | Storage disk name       |
| width      | INT          | NULLABLE                  | Chiều rộng ảnh (pixels) |
| height     | INT          | NULLABLE                  | Chiều cao ảnh (pixels)  |
| variants   | JSON         | NULLABLE                  | Các biến thể ảnh        |
| s3_bucket  | VARCHAR(100) | NULLABLE                  | Tên S3 bucket           |
| s3_region  | VARCHAR(50)  | NULLABLE                  | AWS region              |
| s3_url     | VARCHAR(500) | NULLABLE                  | URL đầy đủ trên S3      |
| cdn_url    | VARCHAR(500) | NULLABLE                  | URL qua CloudFront/CDN  |
| order      | INT          | DEFAULT 0                 | Thứ tự hiển thị         |
| alt_text   | VARCHAR(255) | NULLABLE                  | Mô tả ảnh (SEO)         |
| created_at | TIMESTAMP    | AUTO                      | Thời gian tạo           |
| updated_at | TIMESTAMP    | AUTO                      | Thời gian cập nhật      |
| deleted_at | TIMESTAMP    | NULLABLE                  | Soft delete             |

**Indexes:**

- Primary Key: `id`
- Index: `comment_id`, `order`
- Foreign Key: `comment_id` → `comments(id)` ON DELETE CASCADE

**Relationships:**

- Belongs To → `comments` (N-1)

---

## 🔗 Entity Relationship Diagram (ERD)

| From Table     | Relationship | To Table            | Cardinality | On Delete |
| -------------- | ------------ | ------------------- | ----------- | --------- |
| users          | Has Many     | sallers             | 1-N         | SET NULL  |
| users          | Has Many     | posts               | 1-N         | SET NULL  |
| users          | Has Many     | comments            | 1-N         | SET NULL  |
| homes          | Has Many     | object_groups       | 1-N         | CASCADE   |
| homes          | Has Many     | objects             | 1-N         | CASCADE   |
| sallers        | Belongs To   | users               | N-1         | SET NULL  |
| sallers        | Has Many     | object_groups       | 1-N         | CASCADE   |
| sallers        | Has Many     | objects             | 1-N         | CASCADE   |
| object_groups  | Belongs To   | homes               | N-1         | CASCADE   |
| object_groups  | Belongs To   | sallers             | N-1         | CASCADE   |
| object_groups  | Has Many     | objects             | 1-N         | CASCADE   |
| objects        | Belongs To   | homes               | N-1         | CASCADE   |
| objects        | Belongs To   | sallers             | N-1         | CASCADE   |
| objects        | Belongs To   | object_groups       | N-1         | CASCADE   |
| objects        | Has Many     | posts               | 1-N         | CASCADE   |
| post_types     | Has Many     | posts               | 1-N         | SET NULL  |
| posts          | Belongs To   | objects             | N-1         | CASCADE   |
| posts          | Belongs To   | users               | N-1         | SET NULL  |
| posts          | Belongs To   | post_types          | N-1         | SET NULL  |
| posts          | Has Many     | post_images         | 1-N         | CASCADE   |
| posts          | Has Many     | comments            | 1-N         | CASCADE   |
| post_images    | Belongs To   | posts               | N-1         | CASCADE   |
| comments       | Belongs To   | posts               | N-1         | CASCADE   |
| comments       | Belongs To   | users               | N-1         | SET NULL  |
| comments       | Belongs To   | comments (parent)   | N-1         | CASCADE   |
| comments       | Has Many     | comments (children) | 1-N         | CASCADE   |
| comments       | Has Many     | comment_images      | 1-N         | CASCADE   |
| comment_images | Belongs To   | comments            | N-1         | CASCADE   |

---

## 📝 Migration Order

| Thứ Tự | Table          | Migration File              | Phụ Thuộc                     |
| ------ | -------------- | --------------------------- | ----------------------------- |
| 1      | users          | Built-in Apiato             | -                             |
| 2      | homes          | create_homes_table          | -                             |
| 3      | sallers        | create_sallers_table        | users                         |
| 4      | object_groups  | create_object_groups_table  | homes, sallers                |
| 5      | objects        | create_objects_table        | homes, sallers, object_groups |
| 6      | post_types     | create_post_types_table     | -                             |
| 7      | posts          | create_posts_table          | objects, users, post_types    |
| 8      | post_images    | create_post_images_table    | posts                         |
| 9      | comments       | create_comments_table       | posts, users                  |
| 10     | comment_images | create_comment_images_table | comments                      |

---

**Tài liệu này sẽ được cập nhật khi có thay đổi về database schema.**
