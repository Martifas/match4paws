/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUrlManager } from '../ImageUrlManager';

vi.mock('@mui/material', () => ({
  Box: ({ children, ...props }: any) => (
    <div data-testid="box" {...props}>
      {children}
    </div>
  ),
  Typography: ({ children, ...props }: any) => (
    <div data-testid="typography" {...props}>
      {children}
    </div>
  ),
  TextField: ({
    onChange,
    onKeyPress,
    value,
    placeholder,
    disabled,
    ...props
  }: any) => (
    <input
      data-testid="textfield"
      onChange={onChange}
      onKeyPress={onKeyPress}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
  ),
  Button: ({ children, onClick, disabled, ...props }: any) => (
    <button
      data-testid="button"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ),
  IconButton: ({ children, onClick, ...props }: any) => (
    <button data-testid="icon-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@mui/icons-material', () => ({
  Close: () => <span data-testid="close-icon">×</span>,
}));

describe('ImageUrlManager', () => {
  const mockOnUrlsChange = vi.fn();
  const defaultProps = {
    imageUrls: [],
    onUrlsChange: mockOnUrlsChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial render', () => {
    it('should render with default label', () => {
      render(<ImageUrlManager {...defaultProps} />);

      expect(screen.getByText('Photo URLs')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter image URL')
      ).toBeInTheDocument();
      expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('should render with custom label', () => {
      render(<ImageUrlManager {...defaultProps} label="Custom Photo URLs" />);

      expect(screen.getByText('Custom Photo URLs')).toBeInTheDocument();
    });

    it('should have Add button disabled when input is empty', () => {
      render(<ImageUrlManager {...defaultProps} />);

      const addButton = screen.getByText('Add');
      expect(addButton).toBeDisabled();
    });

    it('should not show added photos section when no URLs', () => {
      render(<ImageUrlManager {...defaultProps} />);

      expect(screen.queryByText(/Added photos/)).not.toBeInTheDocument();
    });
  });

  describe('Adding URLs', () => {
    it('should enable Add button when input has value', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText('Enter image URL');
      const addButton = screen.getByText('Add');

      await user.type(input, 'https://example.com/image.jpg');

      expect(addButton).not.toBeDisabled();
    });

    it('should add URL when Add button is clicked', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText('Enter image URL');
      const addButton = screen.getByText('Add');

      await user.type(input, 'https://example.com/image.jpg');
      await user.click(addButton);

      expect(mockOnUrlsChange).toHaveBeenCalledWith([
        'https://example.com/image.jpg',
      ]);
    });

    it('should clear input after adding URL', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText(
        'Enter image URL'
      ) as HTMLInputElement;
      const addButton = screen.getByText('Add');

      await user.type(input, 'https://example.com/image.jpg');
      await user.click(addButton);

      expect(input.value).toBe('');
    });

    it('should add URL when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText('Enter image URL');

      await user.type(input, 'https://example.com/image.jpg');
      await user.keyboard('{Enter}');

      expect(mockOnUrlsChange).toHaveBeenCalledWith([
        'https://example.com/image.jpg',
      ]);
    });

    it('should trim whitespace from URLs', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText('Enter image URL');
      const addButton = screen.getByText('Add');

      await user.type(input, '  https://example.com/image.jpg  ');
      await user.click(addButton);

      expect(mockOnUrlsChange).toHaveBeenCalledWith([
        'https://example.com/image.jpg',
      ]);
    });

    it('should not add duplicate URLs', async () => {
      const user = userEvent.setup();
      const existingUrls = ['https://example.com/image1.jpg'];
      render(<ImageUrlManager {...defaultProps} imageUrls={existingUrls} />);

      const input = screen.getByPlaceholderText('Enter image URL');
      const addButton = screen.getByText('Add');

      await user.type(input, 'https://example.com/image1.jpg');
      await user.click(addButton);

      expect(mockOnUrlsChange).not.toHaveBeenCalled();
    });

    it('should not add duplicate URLs with different whitespace', async () => {
      const user = userEvent.setup();
      const existingUrls = ['https://example.com/image1.jpg'];
      render(<ImageUrlManager {...defaultProps} imageUrls={existingUrls} />);

      const input = screen.getByPlaceholderText('Enter image URL');
      const addButton = screen.getByText('Add');

      await user.type(input, '  https://example.com/image1.jpg  ');
      await user.click(addButton);

      expect(mockOnUrlsChange).not.toHaveBeenCalled();
    });
  });

  describe('Displaying existing URLs', () => {
    const existingUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ];

    it('should display existing URLs', () => {
      render(<ImageUrlManager {...defaultProps} imageUrls={existingUrls} />);

      expect(screen.getByText('Added photos (3):')).toBeInTheDocument();
      expect(
        screen.getByText('https://example.com/image1.jpg')
      ).toBeInTheDocument();
      expect(
        screen.getByText('https://example.com/image2.jpg')
      ).toBeInTheDocument();
      expect(
        screen.getByText('https://example.com/image3.jpg')
      ).toBeInTheDocument();
    });

    it('should display correct count of URLs', () => {
      render(<ImageUrlManager {...defaultProps} imageUrls={existingUrls} />);

      expect(screen.getByText('Added photos (3):')).toBeInTheDocument();
    });

    it('should render remove button for each URL', () => {
      render(<ImageUrlManager {...defaultProps} imageUrls={existingUrls} />);

      const removeButtons = screen.getAllByTestId('icon-button');
      expect(removeButtons).toHaveLength(3);
    });

    it('should display close icon in remove buttons', () => {
      render(<ImageUrlManager {...defaultProps} imageUrls={existingUrls} />);

      const closeIcons = screen.getAllByTestId('close-icon');
      expect(closeIcons).toHaveLength(3);
    });
  });

  describe('Removing URLs', () => {
    const existingUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ];

    it('should remove URL when remove button is clicked', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} imageUrls={existingUrls} />);

      const removeButtons = screen.getAllByTestId('icon-button');
      await user.click(removeButtons[1]);

      expect(mockOnUrlsChange).toHaveBeenCalledWith([
        'https://example.com/image1.jpg',
        'https://example.com/image3.jpg',
      ]);
    });

    it('should remove correct URL when multiple URLs exist', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} imageUrls={existingUrls} />);

      const removeButtons = screen.getAllByTestId('icon-button');
      await user.click(removeButtons[0]);

      expect(mockOnUrlsChange).toHaveBeenCalledWith([
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
      ]);
    });

    it('should remove last remaining URL', async () => {
      const user = userEvent.setup();
      const singleUrl = ['https://example.com/image1.jpg'];
      render(<ImageUrlManager {...defaultProps} imageUrls={singleUrl} />);

      const removeButton = screen.getByTestId('icon-button');
      await user.click(removeButton);

      expect(mockOnUrlsChange).toHaveBeenCalledWith([]);
    });
  });

  describe('Keyboard interactions', () => {
    it('should prevent default behavior on Enter key', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText('Enter image URL');
      await user.type(input, 'https://example.com/image.jpg');

      const mockPreventDefault = vi.fn();
      fireEvent.keyPress(input, {
        key: 'Enter',
        preventDefault: mockPreventDefault,
      });
    });

    it('should not trigger add on other keys', async () => {
      const user = userEvent.setup();
      render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText('Enter image URL');
      await user.type(input, 'https://example.com/image.jpg');
      await user.keyboard('{Space}');

      expect(mockOnUrlsChange).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle very long URLs with text ellipsis', () => {
      const longUrl =
        'https://example.com/' + 'very-long-path/'.repeat(20) + 'image.jpg';
      render(<ImageUrlManager {...defaultProps} imageUrls={[longUrl]} />);

      expect(screen.getByText(longUrl)).toBeInTheDocument();
    });

    it('should handle special characters in URLs', async () => {
      const user = userEvent.setup();
      const specialUrl =
        'https://example.com/image-with_special@chars&params=1.jpg';
      render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText('Enter image URL');
      const addButton = screen.getByText('Add');

      await user.type(input, specialUrl);
      await user.click(addButton);

      expect(mockOnUrlsChange).toHaveBeenCalledWith([specialUrl]);
    });

    it('should handle empty imageUrls array', () => {
      render(<ImageUrlManager {...defaultProps} imageUrls={[]} />);

      expect(screen.queryByText(/Added photos/)).not.toBeInTheDocument();
    });

    it('should handle single URL in array', () => {
      const singleUrl = ['https://example.com/image.jpg'];
      render(<ImageUrlManager {...defaultProps} imageUrls={singleUrl} />);

      expect(screen.getByText('Added photos (1):')).toBeInTheDocument();
      expect(
        screen.getByText('https://example.com/image.jpg')
      ).toBeInTheDocument();
    });
  });

  describe('Integration scenarios', () => {
    it('should add multiple URLs in sequence', async () => {
      const user = userEvent.setup();
      let currentUrls: string[] = [];
      const mockOnChange = vi.fn(urls => {
        currentUrls = urls;
      });

      const { rerender } = render(
        <ImageUrlManager imageUrls={currentUrls} onUrlsChange={mockOnChange} />
      );

      const input = screen.getByPlaceholderText('Enter image URL');
      const addButton = screen.getByText('Add');

      await user.type(input, 'https://example.com/image1.jpg');
      await user.click(addButton);
      currentUrls = ['https://example.com/image1.jpg'];
      rerender(
        <ImageUrlManager imageUrls={currentUrls} onUrlsChange={mockOnChange} />
      );

      await user.type(input, 'https://example.com/image2.jpg');
      await user.click(addButton);

      expect(mockOnChange).toHaveBeenLastCalledWith([
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ]);
    });

    it('should maintain input state during re-renders', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<ImageUrlManager {...defaultProps} />);

      const input = screen.getByPlaceholderText(
        'Enter image URL'
      ) as HTMLInputElement;
      await user.type(input, 'https://example.com/image.jpg');

      rerender(
        <ImageUrlManager
          {...defaultProps}
          imageUrls={['https://existing.com/image.jpg']}
        />
      );

      expect(input.value).toBe('https://example.com/image.jpg');
    });
  });
});
