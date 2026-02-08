# 📚 Tài liệu Dự án Check-Scam-Homestay

> **Mục đích**: Hệ thống kiểm tra và báo cáo các homestay lừa đảo
> **Ngày tạo**: 2026-02-08
> **Framework**: Laravel 11 + Apiato (Porto SAP Architecture)

---

## 🏗️ Tổng quan Kiến trúc

### Cấu trúc Project

```
Check-Scam-Homestay/
├── check-scam-homestay-api/    # Backend API (Laravel + Apiato)
└── docker/                      # Docker configuration (Nginx, PHP-FPM, MySQL, Redis)
```

### Tech Stack

- **Backend**: PHP 8.2+, Laravel 11, Apiato Framework
- **Database**: MySQL 8.0
- **Cache**: Redis
- **Web Server**: Nginx + PHP-FPM
- **Authentication**: Laravel Passport (OAuth2)
- **Authorization**: Spatie Laravel Permission

---

## 📂 Cấu trúc Backend (Apiato - Porto SAP)

### Kiến trúc Porto SAP

Apiato sử dụng **Porto Software Architectural Pattern** - chia ứng dụng thành các **Container** độc lập:

```
app/
├── Containers/              # Business logic containers
│   ├── AppSection/         # Core application modules
│   ├── ClientSection/      # Client-specific modules
│   └── SharedSection/      # Shared utilities
└── Ship/                   # Framework core components (shared across containers)
```

### Ship Layer (Core Framework)

Chứa các base classes và utilities được share cho tất cả containers:

```
app/Ship/
├── Parents/                # Base classes (Model, Controller, Request, etc.)
├── Criteria/              # Query criteria patterns
├── Commands/              # Artisan commands
├── Middleware/            # HTTP middleware
├── Migrations/            # Core migrations
├── Tests/                 # Test helpers
├── Services/              # Core services
└── Helpers/               # Helper functions
```

### AppSection Containers

#### 1. **Authentication Container** (157 files)

Xử lý xác thực người dùng:

- **Actions**: Login, Register, Logout, Password Reset, Email Verification
- **Notifications**: Email verification, Password reset
- **OAuth2**: Laravel Passport integration
- **Social Auth**: Facebook, Google login
- **Routes**:
    - API: `/api/v1/login`, `/api/v1/register`, `/api/v1/logout`
    - WEB: `/login`, `/logout`

#### 2. **Authorization Container** (177 files)

Quản lý phân quyền:

- **Models**: Role, Permission
- **Policies**: Role policies
- **Enums**: Role (SUPER_ADMIN, ADMIN, USER)
- **Actions**: Assign roles, Grant permissions, Sync permissions
- **Routes**: `/api/v1/roles`, `/api/v1/permissions`

#### 3. **User Container** (78 files)

Quản lý người dùng:

- **Model**: User (UUID, email, password, gender, birth)
- **Actions**: Create, Update, Delete, List users
- **Routes**: `/api/v1/users`, `/api/v1/users/{id}`
- **Features**: Profile management, Password update

---

## 🗄️ Database Schema

### 1. **users** (Built-in Apiato)

```sql
- id: UUID (PK)
- name: string
- email: string (unique, lowercase)
- password: hashed
- gender: enum (Gender)
- birth: date
- email_verified_at: timestamp
- created_at, updated_at
```

### 2. **targets** (Đối tượng bị check - Homestay/Scammer)

```sql
- id: UUID (PK)
- display_name: string (nullable) - Tên homestay/nhóm scam
- status: enum('active', 'disputed', 'removed', 'archived')
- phones: JSON - Danh sách SĐT
- bank_accounts: JSON - STK ngân hàng
- links: JSON - Facebook, bài phốt, chứng cứ
- websites: JSON - Website chính thức/nghi vấn
- emails: JSON - Email liên quan
- extra_data: JSON - Dữ liệu mở rộng
- summary: text - Tóm tắt về target
- created_at, updated_at
```

### 3. **reports** (Báo cáo lừa đảo)

```sql
- id: UUID (PK)
- target_id: UUID (FK -> targets)
- description: text - Mô tả chi tiết
- status: enum('pending', 'reviewed', 'resolved')
- reporter_role: enum('victim', 'proxy') - Nạn nhân/Người đại diện
- amount_lost: decimal(15,2) - Số tiền bị mất
- reporter_info: JSON - Thông tin người báo cáo
- created_at, updated_at
```

### 4. **comments** (Bình luận về target)

```sql
- id: UUID (PK)
- target_id: UUID (FK -> targets)
- user_id: UUID (FK -> users)
- content: text
- created_at, updated_at
```

### 5. **report_evidences** (Chứng cứ báo cáo)

```sql
- id: UUID (PK)
- report_id: UUID (FK -> reports)
- file_path: string - Đường dẫn file
- width, height: int (nullable) - Kích thước ảnh
- mine: string - MIME type
- disk: string - Storage disk
- variants: string (nullable) - JSON các biến thể
- created_at, updated_at
```

---

## 🔐 Authentication & Authorization

### OAuth2 Flow (Laravel Passport)

1. **Register**: `POST /api/v1/register`
2. **Login**: `POST /api/v1/login` → Returns access_token
3. **Authenticated Requests**: Header `Authorization: Bearer {token}`
4. **Refresh Token**: `POST /api/v1/refresh`
5. **Logout**: `POST /api/v1/logout`

### Roles & Permissions (Spatie)

- **SUPER_ADMIN**: Full access
- **ADMIN**: Manage users, moderate reports
- **USER**: Create reports, comments

---

## 🛣️ API Routes Convention

### Naming Pattern

```
{Container}/UI/{Interface}/Routes/{ActionName}.{version}.{access}.php
```

**Ví dụ**:

- `User/UI/API/Routes/ListUsers.v1.private.php`
    - Container: User
    - Interface: API
    - Action: ListUsers
    - Version: v1
    - Access: private (requires auth)

### Route Structure

```php
// File: ListUsers.v1.private.php
use App\Containers\AppSection\User\UI\API\Controllers\ListUsersController;
use Illuminate\Support\Facades\Route;

Route::get('users', ListUsersController::class)
    ->middleware(['auth:api']);
```

---

## 🐳 Docker Environment

### Services

```yaml
services:
    php-fpm: # PHP 8.2 FastCGI
    nginx: # Web server (port 80)
    mysql: # Database (port 3306)
    redis: # Cache (port 6379)
```

### Database Config

- **Database**: `check_scam_homestay_db`
- **User**: `check_scam_user`
- **Password**: `check_scam_user`

### Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f php-fpm
```

---

## 📝 Container Structure Pattern

Mỗi Container trong Apiato có cấu trúc chuẩn:

```
{Container}/
├── Actions/              # Business logic (Use Cases)
├── Tasks/               # Reusable tasks (called by Actions)
├── Models/              # Eloquent models
├── Data/
│   ├── Repositories/    # Data access layer
│   ├── Criterias/       # Query filters
│   └── Seeders/         # Database seeders
├── UI/
│   ├── API/
│   │   ├── Controllers/ # API controllers
│   │   ├── Requests/    # Form requests (validation)
│   │   ├── Routes/      # Route definitions
│   │   └── Transformers/# Response transformers
│   ├── WEB/             # Web interface (if any)
│   └── CLI/             # Console commands
├── Tests/
│   ├── Unit/            # Unit tests
│   └── Functional/      # API tests
├── Configs/             # Container configs
├── Exceptions/          # Custom exceptions
├── Enums/               # Enumerations
├── Policies/            # Authorization policies
└── composer.json        # Container dependencies
```

---

## 🔄 Request Flow (Porto Pattern)

```
Request → Route → Controller → Action → Task(s) → Model
                                  ↓
Response ← Transformer ← Action Result
```

### Ví dụ: List Users

1. **Route**: `GET /api/v1/users` → `ListUsersController`
2. **Controller**: Calls `ListUsersAction`
3. **Action**: Orchestrates business logic
4. **Task**: `GetAllUsersTask` → Query database
5. **Transformer**: Format response
6. **Response**: JSON array of users

---

## 🧪 Testing

### Test Structure

```
{Container}/Tests/
├── Unit/               # Unit tests (isolated)
└── Functional/         # API integration tests
```

### Running Tests

```bash
# All tests
php artisan test

# Specific container
php artisan test app/Containers/AppSection/User

# With coverage
php artisan test --coverage
```

---

## 🚀 Development Workflow

### 1. Tạo Container mới

```bash
php artisan apiato:generate:container
```

### 2. Tạo Action

```bash
php artisan apiato:generate:action
```

### 3. Tạo Task

```bash
php artisan apiato:generate:task
```

### 4. Tạo Model

```bash
php artisan apiato:generate:model
```

### 5. Tạo Route + Controller

```bash
php artisan apiato:generate:route
```

---

## 📦 Key Dependencies

```json
{
    "apiato/core": "^13.1", // Core framework
    "laravel/passport": "^13.0", // OAuth2 authentication
    "spatie/laravel-permission": "^6.0", // Role-based permissions
    "intervention/image": "^3.11", // Image processing
    "wikimedia/composer-merge-plugin": "^2.1" // Merge container composers
}
```

---

## 🎯 Business Logic (Dự kiến)

### Core Features

1. **Target Management**: CRUD homestay/scammer profiles
2. **Report System**: Users submit scam reports with evidence
3. **Comment System**: Community discussion on targets
4. **Moderation**: Admin review and verify reports
5. **Search**: Find targets by phone, bank account, name
6. **Rating/Voting**: Community vote on report credibility

### API Endpoints (Dự kiến)

```
# Targets
GET    /api/v1/targets              # List all targets
POST   /api/v1/targets              # Create target
GET    /api/v1/targets/{id}         # Get target detail
PUT    /api/v1/targets/{id}         # Update target
DELETE /api/v1/targets/{id}         # Delete target

# Reports
GET    /api/v1/reports              # List reports
POST   /api/v1/reports              # Submit report
GET    /api/v1/reports/{id}         # Report detail
PUT    /api/v1/reports/{id}         # Update report status

# Comments
GET    /api/v1/targets/{id}/comments    # Get comments
POST   /api/v1/targets/{id}/comments    # Add comment

# Search
GET    /api/v1/search?q={query}         # Search targets
```

---

## 📖 Tài liệu tham khảo

- **Apiato Docs**: https://apiato.io/docs
- **Porto SAP**: https://mahmoudz.github.io/Porto/
- **Laravel**: https://laravel.com/docs/11.x
- **Passport**: https://laravel.com/docs/11.x/passport
- **Spatie Permissions**: https://spatie.be/docs/laravel-permission

---

## 🔧 Environment Variables

Các biến quan trọng trong `.env`:

```env
# App
APP_NAME=Check-Scam-Homestay
APP_URL=http://localhost
API_URL=http://api.localhost

# Database
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=check_scam_homestay_db
DB_USERNAME=check_scam_user
DB_PASSWORD=check_scam_user

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Hash ID
HASH_ID=true
HASH_ID_KEY=apiato
HASH_ID_LENGTH=16

# API Rate Limiting
GLOBAL_API_RATE_LIMITER_ENABLED=true
GLOBAL_API_RATE_LIMITER_ATTEMPTS_PER_MIN=30

# Pagination
PAGINATION_LIMIT_DEFAULT=10

# Token Expiration
API_TOKEN_EXPIRES=1440              # 24 hours
API_REFRESH_TOKEN_EXPIRES=43200     # 30 days
```

---

## 📌 Lưu ý quan trọng

### 1. UUID Primary Keys

Tất cả tables sử dụng UUID thay vì auto-increment ID:

```php
$table->uuid('id')->primary();
```

### 2. JSON Columns

Nhiều trường dùng JSON để linh hoạt:

- `targets.phones`, `targets.bank_accounts`, `targets.links`
- `reports.reporter_info`

### 3. Soft Deletes

Nên implement soft deletes cho các bảng quan trọng.

### 4. API Versioning

Routes có version (v1, v2) để maintain backward compatibility.

### 5. Middleware

- `auth:api`: Requires authentication
- `throttle`: Rate limiting
- `permission`: Check permissions

---

## 🎓 Hướng dẫn đọc code

### Khi cần tìm hiểu một feature:

1. **Bắt đầu từ Route**: `{Container}/UI/API/Routes/`
2. **Xem Controller**: Biết Action nào được gọi
3. **Đọc Action**: Hiểu business logic
4. **Xem Tasks**: Chi tiết implementation
5. **Check Model**: Database structure & relationships

### Ví dụ: Tìm hiểu "List Users"

```
1. Route: User/UI/API/Routes/ListUsers.v1.private.php
   → GET /api/v1/users → ListUsersController

2. Controller: User/UI/API/Controllers/ListUsersController.php
   → Calls ListUsersAction

3. Action: User/Actions/ListUsersAction.php
   → Calls GetAllUsersTask

4. Task: User/Tasks/GetAllUsersTask.php
   → Query User model

5. Model: User/Models/User.php
   → Database structure
```

---

**Tài liệu này sẽ được cập nhật khi dự án phát triển.**
