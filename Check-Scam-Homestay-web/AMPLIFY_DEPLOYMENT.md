# AWS Amplify Deployment Guide

## Tổng quan
Dự án này được cấu hình để deploy tự động lên AWS Amplify với các môi trường khác nhau.

## Cấu hình Build

### Build Commands
- **Development**: `npm run build:dev`
- **Staging**: `npm run build:staging` 
- **UAT**: `npm run build:uat`
- **Production**: `npm run build:prod`

### Environment Variables cần thiết trên Amplify

#### Cho tất cả môi trường:
```
NODE_VERSION=18
NPM_VERSION=9
```

#### Cho Production (main/master/deployment branches):
```
REACT_APP_API_BASE_URL=https://api.homestay.com/v1
REACT_APP_AUTH_TOKEN_KEY=access_token
REACT_APP_API_TIMEOUT=15000
REACT_APP_ENABLE_DEBUG=false
REACT_APP_ENABLE_MOCK_DATA=false
REACT_APP_ENABLE_CONSOLE_LOGS=false
```

#### Cho Staging:
```
REACT_APP_API_BASE_URL=https://your-staging-api.com/v1
REACT_APP_AUTH_TOKEN_KEY=access_token
REACT_APP_API_TIMEOUT=10000
```

## Cách thiết lập trên AWS Amplify

### 1. Tạo Amplify App
```bash
# Clone repo về local
git clone <repository-url>
cd homestay-web-admin

# Kết nối với AWS Amplify Console
# Chọn GitHub/GitLab repository
# Chọn branch chính (main/master)
```

### 2. Cấu hình Build Settings
- **Build command**: Tự động phát hiện từ `amplify.yml`
- **Output directory**: `dist`
- **Node.js version**: 18.x
- **Package manager**: npm

### 3. Environment Variables
Trong Amplify Console > App Settings > Environment variables:
- Thêm các biến môi trường cần thiết
- Cấu hình khác nhau cho từng branch

### 4. Branch Management
- **main/master**: Production environment
- **deployment**: Production deployment branch (recommended for production builds)
- **staging**: Staging environment  
- **development/dev**: Development environment

## File Structure sau khi build
```
dist/
├── index.html
├── bundle.js
├── assets/
└── static/
```

## Troubleshooting

### Build fails
1. Kiểm tra Node.js version (khuyến nghị 18.x)
2. Kiểm tra environment variables
3. Xem build logs trong Amplify Console

### Runtime errors
1. Kiểm tra API endpoints trong environment variables
2. Kiểm tra CORS settings
3. Kiểm tra browser console errors

## Deployment Branch Workflow

### Khuyến nghị sử dụng nhánh `deployment`
```bash
# Tạo và chuyển sang nhánh deployment
git checkout -b deployment

# Hoặc chuyển sang nhánh deployment đã có
git checkout deployment

# Merge code từ main vào deployment
git merge main

# Push lên remote
git push origin deployment
```

### Cấu hình Amplify cho nhánh deployment
1. Trong Amplify Console > App Settings > General
2. Thêm branch `deployment` 
3. Cấu hình environment variables giống production
4. Enable automatic builds khi có commit mới

### Lợi ích của nhánh deployment
- Tách biệt production build khỏi development
- Kiểm soát tốt hơn việc deploy
- Có thể test build trước khi merge vào main
- Rollback dễ dàng khi có vấn đề

## Monitoring
- Amplify Console > Monitoring
- CloudWatch Logs
- Real User Monitoring (RUM)

## Performance Optimization
- Code splitting đã được cấu hình
- Asset optimization qua Webpack
- Gzip compression tự động
- CDN distribution qua CloudFront
