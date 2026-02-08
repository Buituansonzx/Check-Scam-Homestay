# PROMPT: Tạo migration cho table hosts

## Context

- Project: Check Scam Homestay (Laravel + Apiato)
- Database: MySQL 8.0
- Primary Key: UUID (không dùng auto-increment)

## Task

Tạo migration cho table `hosts` - lưu thông tin homestay/nhà trọ

## Schema

```
hosts:
  - id: UUID PK
  - name: string(255) NOT NULL -> tên homestay
  - address: string(500) nullable -> địa chỉ
  - description: text nullable -> mô tả
  - latitude: string(50) nullable -> vĩ độ GPS
  - longitude: string(50) nullable -> kinh độ GPS
  - rating: decimal(3,2) default 0.00 -> đánh giá (0-5)
  - is_scam: boolean default false -> trạng thái lừa đảo
  - is_confirmed: boolean default false -> đã xác thực
  - followers: int default 0 -> số người theo dõi
  - timestamps (created_at, updated_at)

Indexes:
  - PK: id
  - INDEX: is_scam, is_confirmed, rating
  - FULLTEXT: name, description
```

## Business Rules

- rating: 0.00 - 5.00
- is_scam = true khi có >= 3 báo cáo xác thực
- is_confirmed = true khi admin xác minh

## Relationships

- Has Many: objects (1-N)
- Many to Many: users (qua hosts_users pivot)

## Command

```bash
php artisan make:migration create_hosts_table
```
