import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { completeOnboardingIntro } from '../onboardingIntroUtils';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('completeOnboardingIntro', () => {
  const mockUserId = 'user-123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should make a POST request to the correct endpoint with userId', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await completeOnboardingIntro(mockUserId);

    expect(mockFetch).toHaveBeenCalledWith('/api/update-onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: mockUserId }),
    });
  });

  it('should complete successfully when response is ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await expect(completeOnboardingIntro(mockUserId)).resolves.toBeUndefined();
  });

  it('should throw an error when response is not ok and has error message', async () => {
    const mockErrorResponse = { message: 'User not found' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    await expect(completeOnboardingIntro(mockUserId)).rejects.toThrow(
      'User not found'
    );
  });

  it('should throw default error when response is not ok and has no message', async () => {
    const mockErrorResponse = {};
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    await expect(completeOnboardingIntro(mockUserId)).rejects.toThrow(
      'Failed to update user metadata'
    );
  });

  it('should throw default error when response has null message', async () => {
    const mockErrorResponse = { message: null };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    await expect(completeOnboardingIntro(mockUserId)).rejects.toThrow(
      'Failed to update user metadata'
    );
  });

  it('should throw default error when response has undefined message', async () => {
    const mockErrorResponse = { message: undefined };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    await expect(completeOnboardingIntro(mockUserId)).rejects.toThrow(
      'Failed to update user metadata'
    );
  });

  it('should throw an error when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(completeOnboardingIntro(mockUserId)).rejects.toThrow(
      'Network error'
    );
  });

  it('should handle special characters in userId', async () => {
    const specialUserId = 'user-with-special-chars-@#$%';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await completeOnboardingIntro(specialUserId);

    expect(mockFetch).toHaveBeenCalledWith('/api/update-onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: specialUserId }),
    });
  });

  it('should handle empty string userId', async () => {
    const emptyUserId = '';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await completeOnboardingIntro(emptyUserId);

    expect(mockFetch).toHaveBeenCalledWith('/api/update-onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: emptyUserId }),
    });
  });

  it('should handle response json parsing error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
    });

    await expect(completeOnboardingIntro(mockUserId)).rejects.toThrow(
      'Invalid JSON'
    );
  });

  it('should not call response.json() when response is ok', async () => {
    const mockJsonFn = vi.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: mockJsonFn,
    });

    await completeOnboardingIntro(mockUserId);

    expect(mockJsonFn).not.toHaveBeenCalled();
  });
});
