# PROMPT: Tạo migration cho table sallers

## Context

- Project: Check Scam Homestay
- Database: MySQL 8.0, UUID primary keys

## Task

Tạo migration cho table `sallers` - người bán/môi giới homestay

## Schema

```
sallers:
  - id: UUID PK
  - user_id: UUID FK nullable -> users.id (ON DELETE SET NULL)
  - deposit: decimal(15,2) default 0.00 -> tiền cọc
  - avatar: string(500) nullable -> URL ảnh đại diện
  - name: string(255) NOT NULL -> tên người bán
  - email: string(255) nullable unique -> email liên hệ
  - phone: string(20) nullable -> SĐT ngắn (0987654321)
  - phone_full: string(20) nullable -> SĐT đầy đủ (+84987654321)
  - bank_account: string(50) nullable -> STK ngân hàng
  - link_facebook: string(500) nullable -> URL Facebook
  - link_tiktok: string(500) nullable -> URL Tiktok
  - link_zalo: string(500) nullable -> URL Zalo
  - link_website: string(500) nullable -> URL Website
  - link_other: string(500) nullable -> URL khác
  - order: int default 0 -> thứ tự hiển thị
  - is_scam: boolean default false -> trạng thái lừa đảo
  - timestamps

Indexes:
  - PK: id
  - INDEX: user_id, is_scam, order, phone, email
  - FK: user_id -> users(id) ON DELETE SET NULL
```

## Business Rules

- user_id nullable: saller có thể tồn tại độc lập
- deposit >= 0
- phone format: 10-11 số (VN)
- Ít nhất có 1 trong: email hoặc phone

## Relationships

- Belongs To: users (N-1, nullable)
- Has Many: objects (1-N)

## Command

```bash
php artisan make:migration create_sallers_table
```
