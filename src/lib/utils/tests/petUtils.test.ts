import { describe, it, expect } from 'vitest';
import { truncateText } from '../petUtils';

describe('truncateText', () => {
  it('should return the original text when it is shorter than maxLength', () => {
    const text = 'Short text';
    const result = truncateText(text, 100);
    expect(result).toBe('Short text');
  });

  it('should return the original text when it equals maxLength', () => {
    const text = 'A'.repeat(100);
    const result = truncateText(text, 100);
    expect(result).toBe(text);
  });

  it('should truncate text and add ellipsis when longer than maxLength', () => {
    const text = 'This is a very long text that should be truncated';
    const result = truncateText(text, 20);
    expect(result).toBe('This is a very long ...');
  });

  it('should use default maxLength of 100 when not provided', () => {
    const text = 'A'.repeat(150);
    const result = truncateText(text);
    expect(result).toBe('A'.repeat(100) + '...');
  });

  it('should handle empty string', () => {
    const result = truncateText('');
    expect(result).toBe('');
  });

  it('should handle single character when maxLength is 1', () => {
    const result = truncateText('Hello', 1);
    expect(result).toBe('H...');
  });

  it('should handle maxLength of 0', () => {
    const result = truncateText('Hello', 0);
    expect(result).toBe('...');
  });

  it('should handle special characters and unicode', () => {
    const text = 'Hello 🐕🐱 pets!';
    const result = truncateText(text, 10);
    expect(result).toBe('Hello 🐕🐱...');
  });

  it('should preserve spaces in truncated text', () => {
    const text = 'Hello world this is a test';
    const result = truncateText(text, 12);
    expect(result).toBe('Hello world ...');
  });
});
