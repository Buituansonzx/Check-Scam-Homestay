# PROMPT: Tạo migration cho table objects

## Context

- Project: Check Scam Homestay
- Database: MySQL 8.0, UUID primary keys

## Task

Tạo migration cho table `objects` - lưu thông tin liên lạc & social links của homes/sallers
Tạo migration cho table `object_groups` - lưu thông tin nhóm homestay
tạo migration cho table `object_merge_history` - lưu thông tin nhóm homestay

## Schema

```
objects:
  - id: UUID PK
  - home_id: UUID FK nullable -> homes.id (ON DELETE CASCADE)
  - saller_id: UUID FK nullable -> sallers.id (ON DELETE CASCADE)
  - object_group_id: UUID FK nullable -> object_groups.id (ON DELETE CASCADE)
  - phone: string(20) nullable -> SĐT ngắn (0987654321)
  - phone_full: string(20) nullable -> SĐT đầy đủ (+84987654321)
  - bank_account: string(50) nullable -> STK ngân hàng
  - link_facebook: string(500) nullable -> URL Facebook
  - link_tiktok: string(500) nullable -> URL Tiktok
  - link_zalo: string(500) nullable -> URL Zalo
  - link_website: string(500) nullable -> URL Website
  - link_other: string(500) nullable -> URL khác
  - is_scam: boolean default false -> trạng thái lừa đảo
  - parent_id: UUID FK nullable -> objects.id (ON DELETE CASCADE)
  - timestamps

Indexes:
  - PK: id
  - INDEX: home_id, saller_id, object_group_id, phone, phone_full, bank_account
  - FK: home_id -> homes.id ON DELETE CASCADE
  - FK: saller_id -> sallers.id ON DELETE CASCADE
  - FK: object_group_id -> object_groups.id ON DELETE CASCADE
  - FK: parent_id -> objects.id ON DELETE CASCADE

object_groups:
  - id: UUID PK
  - name: string(255) NOT NULL -> Tên nhóm
  - description: text nullable -> Mô tả nhóm
  - home_id: UUID FK nullable -> homes.id (ON DELETE CASCADE)
  - saller_id: UUID FK nullable -> sallers.id (ON DELETE CASCADE)
  - phones: json nullable -> Mảng SĐT ["0987654321", "0912345678"]
  - phone_fulls: json nullable -> Mảng SĐT đầy đủ ["+84987654321", "+84912345678"]
  - bank_accounts: json nullable -> Mảng STK ngân hàng ["1234567890", "0987654321"]
  - link_facebooks: json nullable -> Mảng URL Facebook ["https://fb.com/user1", "https://fb.com/user2"]
  - link_tiktoks: json nullable -> Mảng URL Tiktok ["https://tiktok.com/@user1"]
  - link_zalos: json nullable -> Mảng URL Zalo ["https://zalo.me/user1"]
  - link_websites: json nullable -> Mảng URL Website ["https://example.com"]
  - link_others: json nullable -> Mảng URL khác ["https://other.com"]
  - is_scam: boolean default false -> trạng thái lừa đảo
  - timestamps

Indexes:
  - PK: id
  - INDEX: home_id, saller_id
  - FK: home_id -> homes(id) ON DELETE CASCADE
  - FK: saller_id -> sallers(id) ON DELETE CASCADE

object_merge_history:
  - id: UUID PK
  - parent_object_id: UUID FK NOT NULL -> objects.id (ON DELETE CASCADE)
  - child_object_ids: json NOT NULL -> mảng UUID ["uuid1", "uuid2"]
  - group_id: UUID FK nullable -> object_groups.id (ON DELETE CASCADE)
  - user_id: UUID FK nullable -> users.id (ON DELETE SET NULL)
  - timestamps

Indexes:
  - PK: id
  - INDEX: parent_object_id, group_id, user_id
  - FK: parent_object_id -> objects.id ON DELETE CASCADE
  - FK: group_id -> object_groups.id ON DELETE CASCADE
  - FK: user_id -> users.id ON DELETE SET NULL
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
