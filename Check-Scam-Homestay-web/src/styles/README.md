# Hệ Thống Quản Lý Màu Sắc (Color Configuration System)

Tài liệu này cung cấp tổng quan về hệ thống quản lý màu sắc và theme trong dự án này.

## Cấu Trúc File

- `src/styles/_colors.scss`: Biến màu SCSS cốt lõi
- `src/styles/_mixins.scss`: Các mixin SCSS và hàm tiện ích
- `src/styles/config.scss`: File cấu hình SCSS chính, import màu và mixin
- `src/styles/variables.less`: Phiên bản LESS của biến màu
- `src/styles/theme.ts`: Phiên bản TypeScript của theme để dùng trong component React

## Cách Sử Dụng

### Trong File SCSS

Sử dụng file config ở đầu file SCSS:

```scss
@use './config' as *;

.my-component {
  color: $primary-color;
  background-color: $bg-light;
  border: 1px solid $border-color;
  border-radius: $border-radius-md;
  box-shadow: $box-shadow;

  // Sử dụng mixin
  @include flex-center;

  // Sử dụng media query
  @include respond-to(md) {
    flex-direction: row;
  }
}
```

### Trong File LESS

Import file biến màu ở đầu file LESS:

```less
@import './variables.less';

.my-component {
  color: @primary-color;
  background-color: @bg-light;
  border: 1px solid @border-color;
  border-radius: @border-radius-md;
  box-shadow: @box-shadow;

  // Sử dụng mixin
  .flex-center();
}
```

### Trong Component React

Import theme hoặc giá trị cụ thể từ file theme:

```tsx
import React from 'react';
import theme, { colors, typography } from '../styles/theme';

const MyComponent: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: colors.background.light,
    color: colors.text.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    fontFamily: theme.typography.fontFamily,
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: typography.fontSize.xl }}>Được style bằng theme</h2>
    </div>
  );
};

export default MyComponent;
```

## Bảng Màu (Color Palette)

Hệ thống màu được tổ chức theo các nhóm sau:

1. **Màu chính (Primary Colors)**
   - Màu thương hiệu chính và các biến thể

2. **Màu phụ (Secondary Colors)**
   - Màu thương hiệu phụ và các biến thể

3. **Màu trung tính (Neutral Colors)**
   - Trắng, đen, các sắc độ xám

4. **Màu chữ (Text Colors)**
   - Dùng cho tiêu đề, nội dung, trạng thái disabled

5. **Màu chức năng (Functional Colors)**
   - Dùng cho trạng thái info, success, warning, error

6. **Màu nền (Background Colors)**
   - Dùng cho các lớp nền khác nhau

## Thuộc Tính Theme Bổ Sung

Theme còn bao gồm:

- **Typography**: Font, cỡ chữ, độ đậm
- **Spacing**: Khoảng cách chuẩn
- **Border Radius**: Bo góc các mức
- **Shadows**: Đổ bóng các mức
- **Breakpoints**: Cho responsive

## Mở Rộng

Để thêm màu hoặc thuộc tính theme mới:

1. Thêm vào `_colors.scss`
2. Thêm vào `variables.less`
3. Thêm vào `theme.ts`

Làm như vậy sẽ đảm bảo sự nhất quán giữa tất cả các cách styling trong dự án.
