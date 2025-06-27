import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { OnboardingFormData } from '@/lib/types/onboarding';
import { submitOnboarding } from '../onboardingUtils';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('submitOnboarding', () => {
  const mockUserId = 'user-123';
  const mockFormData: OnboardingFormData = {
    userType: 'petOwner',
    name: 'John',
    email: 'john@pets.com',
    phone: '+151500000',
    address: 'Oak Street 1, New York',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should make a POST request to the correct endpoint with correct data', async () => {
    const mockResponse = { success: true, message: 'Onboarding completed' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await submitOnboarding(mockUserId, mockFormData);

    expect(mockFetch).toHaveBeenCalledWith('/api/update-onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: mockUserId, ...mockFormData }),
    });
  });

  it('should return the response data when request is successful', async () => {
    const mockResponse = { success: true, message: 'Onboarding completed' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await submitOnboarding(mockUserId, mockFormData);

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when response is not ok and has error message', async () => {
    const mockErrorResponse = { error: 'Invalid user data' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    await expect(submitOnboarding(mockUserId, mockFormData)).rejects.toThrow(
      'Invalid user data'
    );
  });

  it('should throw default error when response is not ok and has no error message', async () => {
    const mockErrorResponse = {};
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    await expect(submitOnboarding(mockUserId, mockFormData)).rejects.toThrow(
      'Failed to complete onboarding'
    );
  });

  it('should throw an error when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(submitOnboarding(mockUserId, mockFormData)).rejects.toThrow(
      'Network error'
    );
  });

  it('should handle empty formData', async () => {
    const emptyFormData = {} as OnboardingFormData;
    const mockResponse = { success: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await submitOnboarding(mockUserId, emptyFormData);

    expect(mockFetch).toHaveBeenCalledWith('/api/update-onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: mockUserId }),
    });
  });

  it('should handle special characters in userId and formData', async () => {
    const specialUserId = 'user-with-special-chars-@#$%';
    const specialFormData: OnboardingFormData = {
      userType: 'petOwner',
      name: 'John 🐕',
      email: 'john@pets.com',
      phone: '+151500000',
      address: 'Oak Street 1, New York',
    };
    const mockResponse = { success: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await submitOnboarding(specialUserId, specialFormData);

    expect(mockFetch).toHaveBeenCalledWith('/api/update-onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: specialUserId, ...specialFormData }),
    });
  });

  it('should handle response json parsing error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
    });

    await expect(submitOnboarding(mockUserId, mockFormData)).rejects.toThrow(
      'Invalid JSON'
    );
  });
});
