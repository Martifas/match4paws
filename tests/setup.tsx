/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react';
import { vi } from 'vitest';

export const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    prefetch: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a
      href={typeof href === 'string' ? href : (href?.pathname ?? '')}
      {...props}
    >
      {children}
    </a>
  ),
}));



vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...rest }: any) => (
    <Image
      src={typeof src === 'string' ? src : (src?.src ?? '')}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="next-image"
      {...rest}
    />
  ),
}));

vi.mock('@mui/material', () => ({
  BottomNavigation: ({ onChange, children }: any) => (
    <div>
      {React.Children.map(children, (c: any, i: number) =>
        React.cloneElement(c, {
          onClick: () => onChange(null, i),
        })
      )}
    </div>
  ),
  BottomNavigationAction: ({ label, onClick }: any) => (
    <button onClick={onClick}>{label}</button>
  ),
  Fab: ({ onClick }: any) => (
    <button data-testid="fab" onClick={onClick}>
      +
    </button>
  ),

  Box: ({ children, sx, ...props }: any) => (
    <div style={sx} {...props}>
      {children}
    </div>
  ),
  Typography: ({ children, variant, sx }: any) => (
    <div data-variant={variant} style={sx}>
      {children}
    </div>
  ),
  Card: ({ children, sx }: any) => (
    <div data-testid="card" style={sx}>
      {children}
    </div>
  ),
  CardMedia: ({ image, alt, height }: any) => (
    <Image src={image} alt={alt} height={height} data-testid="card-media" />
  ),
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardActions: ({ children }: any) => (
    <div data-testid="card-actions">{children}</div>
  ),
  Button: ({ children, startIcon, onClick, size }: any) => (
    <button onClick={onClick} data-size={size}>
      {startIcon}
      {children}
    </button>
  ),
  Grid: ({ children, container, spacing, size }: any) => (
    <div
      data-grid={container || size}
      data-spacing={spacing}
      data-size={size ? JSON.stringify(size) : undefined}
    >
      {children}
    </div>
  ),
  Chip: ({ label, size, variant }: any) => (
    <span data-testid="chip" data-size={size} data-variant={variant}>
      {label}
    </span>
  ),
  IconButton: ({ children, onClick, size }: any) => (
    <button onClick={onClick} data-size={size} data-testid="icon-button">
      {children}
    </button>
  ),
  Menu: ({ children, open, onClose }: any) =>
    open ? (
      <div data-testid="menu" onClick={onClose}>
        {children}
      </div>
    ) : null,
  MenuItem: ({ children, onClick, sx }: any) => (
    <div data-testid="menu-item" onClick={onClick} style={sx}>
      {children}
    </div>
  ),
  Dialog: ({ children, open, ...p }: any) =>
    open ? (
      <div role="dialog" data-testid="dialog" {...p}>
        {children}
      </div>
    ) : null,
  DialogTitle: ({ children }: any) => (
    <div data-testid="dialog-title">{children}</div>
  ),
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogActions: ({ children }: any) => (
    <div data-testid="dialog-actions">{children}</div>
  ),
  TextField: ({ label, value, onChange, ...p }: any) => (
    <input aria-label={label} value={value} onChange={onChange} {...p} />
  ),
}));

vi.mock('@mui/icons-material', () => ({
  HomeFilled: () => <span data-testid="home-filled" />,
  Favorite: () => <span data-testid="favorite-icon" />,
  Message: () => <span data-testid="message-icon" />,
  Person: () => <span data-testid="person-icon" />,
  Add: () => <span data-testid="add-icon">+</span>,
  MoreVert: () => <span data-testid="more-vert-icon">⋮</span>,
  Edit: ({ fontSize, sx }: any) => (
    <span data-testid="edit-icon" data-font-size={fontSize} style={sx}>
      ✏️
    </span>
  ),
  Delete: ({ fontSize, sx }: any) => (
    <span data-testid="delete-icon" data-font-size={fontSize} style={sx}>
      🗑️
    </span>
  ),
  Visibility: () => <span data-testid="visibility-icon">👁️</span>,
  Close: () => <span data-testid="close-icon">✖</span>, // ← add this line
}));

vi.mock('@mui/material/CssBaseline', () => ({
  __esModule: true,
  default: () => <div data-testid="mui-cssbaseline" />,
}));

vi.mock('@mui/material/Container', () => ({
  __esModule: true,
  default: ({
    children,
    maxWidth,
    disableGutters,
    sx,
    ...rest
  }: {
    children: React.ReactNode;
    maxWidth?: string;
    disableGutters?: boolean;

    sx?: Record<string, any>;
  }) => (
    <div
      data-testid="mui-container"
      data-maxwidth={maxWidth}
      data-disable-gutters={disableGutters ? 'true' : 'false'}
      style={sx}
      {...rest}
    >
      {children}
    </div>
  ),
}));
