// ---------------------------------------------
// File: theme.ts
// Tác dụng: Quản lý cấu hình màu sắc, typography, spacing, border, shadow, breakpoints cho toàn dự án dưới dạng JS object
// - Dùng cho code JavaScript/TypeScript (component, style-in-js...)
// - Các giá trị nên đồng bộ với biến màu trong _colors.scss để nhất quán giữa JS và SCSS
// - Giúp tái sử dụng, dễ bảo trì, dễ chuyển theme động trong code React
// ---------------------------------------------

/**
 * Color configuration for the project
 * This file exports color constants that can be used in JavaScript/TypeScript code
 * The values here should match those defined in _colors.scss
 */

export const colors = {
  // Primary colors
  primary: {
    main: '#1890ff', // $primary-color
    light: '#40a9ff', // $primary-light
    dark: '#096dd9', // $primary-dark
  },
  // Secondary colors
  secondary: {
    main: '#f5f5f5', // $secondary-color
    light: '#fafafa', // $secondary-light
    dark: '#e8e8e8', // $secondary-dark
  },
  // Neutral colors
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      100: '#f9f9f9',
      200: '#f0f0f0',
      300: '#e5e5e5',
      400: '#d9d9d9',
      500: '#bfbfbf',
      600: '#8c8c8c',
      700: '#595959',
      800: '#434343',
      900: '#262626',
    },
  },
  // Text colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    disabled: '#999999',
  },
  // Functional colors
  functional: {
    info: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    infoDark: '#177ddc',
    successDark: '#49aa19',
    warningDark: '#d89614',
    errorDark: '#d32029',
  },
  // Background colors
  background: {
    main: '#f0f2f5',
    light: '#fafafa',
    dark: '#e6e6e6',
    card: '#ffffff',
    cardDark: '#252525',
  },
  // Border colors
  border: {
    main: '#d9d9d9',
    dark: '#434343',
  },
};

// Re-export individually for convenience
export const primaryColor = colors.primary.main;
export const secondaryColor = colors.secondary.main;
export const white = colors.neutral.white;
export const black = colors.neutral.black;

// Typography
export const typography = {
  fontFamily:
    "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    xxl: '1.5rem', // 24px
    h3: '1.75rem', // 28px
    h2: '2rem', // 32px
    h1: '2.5rem', // 40px
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
};

// Spacing
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  xxl: '3rem', // 48px
};

// Border radiuses
export const borderRadius = {
  small: '4px', // $border-radius-sm
  medium: '8px', // $border-radius-md
  large: '16px', // $border-radius-lg
  round: '50%',
};

// Shadows
export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 12px rgba(0, 0, 0, 0.1)', // $box-shadow
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
};

// Breakpoints (matching the mixins in _mixins.scss)
export const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

// Theme object that combines all values
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
};

export default theme;
