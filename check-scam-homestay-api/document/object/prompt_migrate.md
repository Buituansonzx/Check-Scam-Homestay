# PROMPT: Tạo migration cho table objects

## Context

- Project: Check Scam Homestay
- Database: MySQL 8.0, UUID primary keys

## Task

Tạo migration cho table `objects` - lưu thông tin liên lạc & social links của homes/sallers

## Schema

```
objects:
  - id: UUID PK
  - home_id: UUID FK nullable -> homes.id (ON DELETE CASCADE)
  - saller_id: UUID FK nullable -> sallers.id (ON DELETE CASCADE)
  - phone: string(20) nullable -> SĐT ngắn (0987654321)
  - phone_full: string(20) nullable -> SĐT đầy đủ (+84987654321)
  - bank_account: string(50) nullable -> STK ngân hàng
  - link_facebook: string(500) nullable -> URL Facebook
  - link_tiktok: string(500) nullable -> URL Tiktok
  - link_zalo: string(500) nullable -> URL Zalo
  - link_website: string(500) nullable -> URL Website
  - link_other: string(500) nullable -> URL khác
  - is_scam: boolean default false -> trạng thái lừa đảo
  - timestamps

Indexes:
  - PK: id
  - INDEX: home_id, saller_id, phone, phone_full, bank_account
  - FK: home_id -> homes(id) ON DELETE CASCADE
  - FK: saller_id -> sallers(id) ON DELETE CASCADE
```

## Business Rules

- **home_id và saller_id**: Cả 2 đều nullable, có thể null cùng lúc
- Object có thể:
    - Thuộc về home (home_id có giá trị, saller_id null)
    - Thuộc về saller (saller_id có giá trị, home_id null)
    - Thuộc về cả 2 (cả 2 đều có giá trị - saller quản lý home)
    - Độc lập (cả 2 đều null - thông tin liên lạc chung)
- phone_full format: +84XXXXXXXXX
- Auto-convert: phone -> phone_full khi save
- link\_\* phải là URL hợp lệ

## Relationships

- Belongs To: homes (N-1, nullable)
- Belongs To: sallers (N-1, nullable)

## Use Cases

- Search theo phone/bank_account
- Lưu nhiều cách liên lạc cho 1 home/saller
- Link home với saller (cả 2 đều có giá trị)

## Command

```bash
php artisan make:migration create_objects_table
```
