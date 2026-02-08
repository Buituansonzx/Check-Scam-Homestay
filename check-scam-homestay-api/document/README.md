# 📚 Database Documentation - Check Scam Homestay

> **Tài liệu tổng hợp về Database Schema**  
> **Cập nhật**: 2026-02-08

---

## 📖 Cách sử dụng tài liệu này

### 🎯 Mục đích

Tài liệu này giúp developers hiểu rõ:

- Cấu trúc database của hệ thống
- Quan hệ giữa các tables
- Business rules và validation
- Cách query và sử dụng data

### 📂 Cấu trúc thư mục

```
document/
├── README.md                    # File này - Hướng dẫn tổng quan
├── index.md                     # Tài liệu tổng quan dự án
├── database-schema.md           # Schema tổng hợp tất cả tables
│
├── host/
│   └── database.md             # Chi tiết module Hosts
│
├── saller/
│   └── database.md             # Chi tiết module Sallers
│
└── object/
    └── database.md             # Chi tiết module Objects
```

---

## 🗂️ Danh sách Tables

### Core Tables (Apiato Built-in)

| Table         | Description                 | Doc                                                |
| ------------- | --------------------------- | -------------------------------------------------- |
| `users`       | Tài khoản người dùng        | [database-schema.md](./database-schema.md#1-users) |
| `roles`       | Vai trò (Admin, User, etc.) | Apiato Authorization                               |
| `permissions` | Quyền hạn                   | Apiato Authorization                               |

### Business Tables (Custom)

| Table              | Description                       | Module  | Doc                                                                                 |
| ------------------ | --------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `hosts`            | Thông tin homestay/nhà trọ        | Host    | [host/database.md](./host/database.md)                                              |
| `hosts_users`      | Pivot: Users quản lý Hosts        | Host    | [host/database.md](./host/database.md#-table-hosts_users-pivot-table)               |
| `sallers`          | Người bán/môi giới                | Saller  | [saller/database.md](./saller/database.md)                                          |
| `objects`          | Thông tin liên lạc & social links | Object  | [object/database.md](./object/database.md)                                          |
| `targets`          | Đối tượng bị check (old schema)   | Report  | [database-schema.md](./database-schema.md#6--table-targets-old-schema---cần-review) |
| `reports`          | Báo cáo lừa đảo                   | Report  | [database-schema.md](./database-schema.md#7--table-reports)                         |
| `report_evidences` | Chứng cứ báo cáo                  | Report  | [database-schema.md](./database-schema.md#8--table-report_evidences)                |
| `comments`         | Bình luận về targets              | Comment | [database-schema.md](./database-schema.md#9--table-comments)                        |

---

## 🔗 Quan hệ chính

### Entity Relationship Diagram

```
┌──────────┐
│  users   │
└────┬─────┘
     │
     ├─────────────────┐
     │                 │
     ▼                 ▼
┌──────────┐    ┌──────────────┐
│ sallers  │    │ hosts_users  │
└────┬─────┘    └──────┬───────┘
     │                 │
     │                 ▼
     │          ┌──────────┐
     │          │  hosts   │
     │          └────┬─────┘
     │               │
     └───────┬───────┘
             ▼
      ┌──────────┐
      │ objects  │
      └──────────┘

┌──────────┐
│ targets  │◄────┐
└────┬─────┘     │
     │           │
     ├───────────┤
     │           │
     ▼           │
┌──────────┐  ┌──────────┐
│ reports  │  │ comments │
└────┬─────┘  └──────────┘
     │
     ▼
┌──────────────────┐
│ report_evidences │
└──────────────────┘
```

### Relationships Summary

| From    | To               | Type | Via                          |
| ------- | ---------------- | ---- | ---------------------------- |
| users   | sallers          | 1-N  | `sallers.user_id`            |
| users   | hosts            | N-N  | `hosts_users` pivot          |
| hosts   | objects          | 1-N  | `objects.host_id`            |
| sallers | objects          | 1-N  | `objects.saller_id`          |
| targets | reports          | 1-N  | `reports.target_id`          |
| targets | comments         | 1-N  | `comments.target_id`         |
| reports | report_evidences | 1-N  | `report_evidences.report_id` |
| users   | comments         | 1-N  | `comments.user_id`           |

---

## 📖 Hướng dẫn đọc tài liệu

### 1️⃣ Bắt đầu với Overview

Đọc file [`index.md`](./index.md) để hiểu:

- Tổng quan kiến trúc dự án
- Tech stack
- Cấu trúc Apiato Porto SAP

### 2️⃣ Xem Database Schema tổng hợp

Đọc file [`database-schema.md`](./database-schema.md) để:

- Xem tất cả tables trong 1 file
- Hiểu relationships diagram
- Xem migration order
- Đọc use cases tổng hợp

### 3️⃣ Đọc chi tiết từng Module

Khi cần implement feature cụ thể, đọc file tương ứng:

#### 🏠 Làm việc với Hosts

→ Đọc [`host/database.md`](./host/database.md)

- Schema chi tiết
- Business rules
- API endpoints
- Sample queries

#### 💼 Làm việc với Sallers

→ Đọc [`saller/database.md`](./saller/database.md)

- Schema chi tiết
- User linking logic
- Sample code

#### 🎯 Làm việc với Objects

→ Đọc [`object/database.md`](./object/database.md)

- Contact info structure
- Search logic
- Phone normalization

---

## 🚀 Quick Start Guide

### Khi cần tạo Migration

1. **Đọc schema** trong file tương ứng
2. **Check migration order** trong `database-schema.md`
3. **Tạo migration**:
    ```bash
    php artisan apiato:generate:migration create_hosts_table
    ```
4. **Copy schema** từ tài liệu vào migration file
5. **Run migration**:
    ```bash
    php artisan migrate
    ```

### Khi cần Query Data

1. **Xem Use Cases** trong file module tương ứng
2. **Copy sample query** và modify
3. **Hoặc dùng Eloquent** theo relationships đã define

### Khi cần Validate Data

1. **Xem Validation Rules** trong file module
2. **Copy vào Request class**
3. **Customize** theo business logic

---

## 📊 Migration Order (Quan trọng!)

Khi tạo migrations, **PHẢI** tuân theo thứ tự sau:

```
1. users              ✅ (Apiato built-in)
2. hosts              ✅ (Không phụ thuộc)
3. sallers            ✅ (FK: user_id nullable)
4. hosts_users        ✅ (FK: host_id, user_id)
5. objects            ✅ (FK: host_id, saller_id)
6. targets            ✅ (Không phụ thuộc)
7. reports            ✅ (FK: target_id)
8. report_evidences   ✅ (FK: report_id)
9. comments           ✅ (FK: target_id, user_id)
```

**Lý do**: Foreign keys phải reference đến tables đã tồn tại.

---

## 🔍 Search & Filter Patterns

### 1. Search theo Phone

```sql
-- Trong objects table
SELECT * FROM objects
WHERE phone LIKE '%0987654321%'
   OR phone_full LIKE '%+84987654321%';
```

### 2. Search theo Bank Account

```sql
SELECT o.*, h.name as host_name, s.name as saller_name
FROM objects o
LEFT JOIN hosts h ON h.id = o.host_id
LEFT JOIN sallers s ON s.id = o.saller_id
WHERE o.bank_account = '1234567890';
```

### 3. Search Hosts theo tên

```sql
SELECT * FROM hosts
WHERE name LIKE '%keyword%'
  AND is_confirmed = true
  AND is_scam = false
ORDER BY rating DESC;
```

### 4. Tìm Scam Hosts/Sallers

```sql
-- Hosts
SELECT * FROM hosts WHERE is_scam = true;

-- Sallers
SELECT * FROM sallers WHERE is_scam = true;
```

---

## ⚠️ Important Notes

### 🔒 Security

- **Sensitive Data**: `phone`, `bank_account`, `email` cần permission để xem
- **PII Protection**: Implement data masking cho public API
- **Access Control**: Row-level security cho hosts/sallers

### 🎯 Business Logic

- **Scam Detection**: Auto-mark khi có >= 3 verified reports
- **Confirmation**: Admin phải verify trước khi public
- **Soft Delete**: Implement cho tất cả tables quan trọng

### 🚀 Performance

- **Indexes**: Đã define trong mỗi table schema
- **Eager Loading**: Always eager load relationships
- **Caching**: Cache frequently accessed data

### 🔄 Future Enhancements

- Merge `targets` và `objects` tables
- Add audit fields (`created_by`, `updated_by`, `deleted_by`)
- Implement full-text search
- Add versioning cho data changes

---

## 📝 Conventions

### Naming

- **Tables**: Plural, lowercase (users, hosts, sallers)
- **Columns**: Snake_case (user_id, created_at)
- **Foreign Keys**: `{table_singular}_id` (host_id, saller_id)
- **Pivot Tables**: `{table1}_{table2}` alphabetically (hosts_users)

### Data Types

- **IDs**: UUID (not auto-increment)
- **Timestamps**: TIMESTAMP (auto-managed by Laravel)
- **Booleans**: BOOLEAN (default false)
- **Money**: DECIMAL(15,2)
- **JSON**: JSON type (not TEXT)

### Indexes

- **Primary Key**: Always UUID
- **Foreign Keys**: Always indexed
- **Search Fields**: Index for LIKE queries
- **Unique Constraints**: Where applicable

---

## 🛠️ Tools & Commands

### Generate Migration

```bash
php artisan apiato:generate:migration create_{table}_table
```

### Generate Model

```bash
php artisan apiato:generate:model {Container} {ModelName}
```

### Run Migrations

```bash
php artisan migrate
php artisan migrate:fresh --seed  # Reset & seed
```

### Check Database

```bash
php artisan db:show              # Show database info
php artisan db:table {table}     # Show table structure
```

---

## 📞 Support

Nếu có thắc mắc về database schema:

1. Đọc file tài liệu tương ứng
2. Check `database-schema.md` cho overview
3. Xem sample queries trong use cases
4. Hỏi team lead nếu vẫn unclear

---

**Happy Coding! 🚀**
