# 🎯 PROMPTS - Database Migrations

> **Hướng dẫn sử dụng**: Đọc file prompt tương ứng, sau đó yêu cầu AI tạo migration

---

## 📂 Danh sách Prompts

### Core Tables

| Table         | Prompt File                                    | Mô tả                             |
| ------------- | ---------------------------------------------- | --------------------------------- |
| `hosts`       | [host/prompt.md](./host/prompt.md)             | Thông tin homestay/nhà trọ        |
| `hosts_users` | [host/prompt-pivot.md](./host/prompt-pivot.md) | Pivot: Users quản lý Hosts        |
| `sallers`     | [saller/prompt.md](./saller/prompt.md)         | Người bán/môi giới                |
| `objects`     | [object/prompt.md](./object/prompt.md)         | Thông tin liên lạc & social links |

---

## 🚀 Cách sử dụng

### Bước 1: Đọc prompt

```bash
# Mở file prompt tương ứng
cat document/host/prompt.md
```

### Bước 2: Yêu cầu AI

```
Đọc file document/host/prompt.md và tạo migration theo đúng schema
```

### Bước 3: AI sẽ tự động

1. Đọc prompt
2. Tạo migration file
3. Viết code migration
4. Run migration (nếu cần)

---

## 📋 Migration Order

**Quan trọng**: Tạo migrations theo thứ tự sau để tránh lỗi foreign key

```
1. users              ✅ (Apiato built-in)
2. hosts              → host/prompt.md
3. sallers            → saller/prompt.md
4. hosts_users        → host/prompt-pivot.md
5. objects            → object/prompt.md
```

---

## 💡 Tips

### Format Prompt chuẩn

```markdown
# PROMPT: Tạo migration cho table {name}

## Context

- Project info
- Database info

## Task

Mô tả ngắn gọn

## Schema
```

table_name:

- column: type attributes -> description

````

## Business Rules
- Rule 1
- Rule 2

## Relationships
- Relation 1
- Relation 2

## Command
```bash
command here
````

```

### Khi nào dùng Prompt
✅ Tạo migrations
✅ Tạo models
✅ Tạo seeders
✅ Quick reference

### Khi nào dùng Database.md (tài liệu đầy đủ)
✅ Hiểu sâu business logic
✅ Xem use cases & queries
✅ Sample code implementation
✅ API endpoints design

---

## 🎯 Example Usage

### Ví dụ 1: Tạo migration hosts
```

USER: Đọc document/host/prompt.md và tạo migration
AI: [Đọc prompt] → [Tạo migration file] → [Viết code] → Done!

```

### Ví dụ 2: Tạo tất cả migrations
```

USER: Đọc tất cả prompts trong document/ và tạo migrations theo đúng order
AI: [Đọc prompts] → [Tạo theo thứ tự 1,2,3,4,5] → Done!

```

### Ví dụ 3: Tạo model + migration
```

USER: Đọc document/saller/prompt.md, tạo migration và model Saller
AI: [Đọc prompt] → [Tạo migration] → [Tạo model với relationships] → Done!

````

---

## 📝 Template Prompt

Copy template này khi tạo prompt mới:

```markdown
# PROMPT: Tạo migration cho table {table_name}

## Context
- Project: Check Scam Homestay
- Database: MySQL 8.0, UUID primary keys

## Task
Mô tả ngắn gọn task

## Schema
````

table_name:

- id: UUID PK
- column_name: type attributes -> description
- timestamps

````

## Business Rules
- Rule 1
- Rule 2

## Relationships
- Relation type: target (cardinality)

## Command
```bash
php artisan make:migration create_{table}_table
````

```

---

**Lợi ích của Prompts**:
- ✅ Ngắn gọn, dễ đọc (1 trang)
- ✅ Chứa đủ thông tin để AI hiểu
- ✅ Không cần đọc tài liệu dài
- ✅ Copy-paste nhanh
- ✅ Consistent format
```
