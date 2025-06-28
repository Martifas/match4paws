import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAuthenticatedUser, handleUserSession } from '../authUtils';

vi.mock('@/lib/auth0', () => ({
  auth0: {
    getSession: vi.fn(),
  },
}));

vi.mock('@/lib/queries/users', () => ({
  createUser: vi.fn(),
  updateLastLogin: vi.fn(),
  getUserOnboardingStatus: vi.fn(),
}));

import { auth0 } from '@/lib/auth0';
import {
  createUser,
  updateLastLogin,
  getUserOnboardingStatus,
} from '@/lib/queries/users';

const mockGetSession = vi.mocked(auth0.getSession);
const mockCreateUser = vi.mocked(createUser);
const mockUpdateLastLogin = vi.mocked(updateLastLogin);
const mockGetUserOnboardingStatus = vi.mocked(getUserOnboardingStatus);

describe('authUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAuthenticatedUser', () => {
    it('should return user when session exists', async () => {
      const mockUser = {
        sub: 'auth0|123456',
        id: 'user-123',
        email: 'test@example.com',
      };
      const mockSession = {
        user: mockUser,
        tokenSet: {
          accessToken: 'mock-access-token',
          expiresAt: Date.now() + 3600000,
        },
        internal: {
          sid: 'mock-session-id',
          createdAt: Date.now(),
        },
      };
      mockGetSession.mockResolvedValueOnce(mockSession);

      const result = await getAuthenticatedUser();

      expect(result).toEqual(mockUser);
      expect(mockGetSession).toHaveBeenCalledOnce();
    });

    it('should return null when session is null', async () => {
      mockGetSession.mockResolvedValueOnce(null);

      const result = await getAuthenticatedUser();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
    });

    it('should return null when session is undefined', async () => {
      mockGetSession.mockResolvedValueOnce(undefined);

      const result = await getAuthenticatedUser();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
    });

    it('should return null when session exists but user is null', async () => {
      const mockSession = {
        user: null,
        tokenSet: {
          accessToken: 'mock-access-token',
          expiresAt: Date.now() + 3600000,
        },
        internal: {
          sid: 'mock-session-id',
          createdAt: Date.now(),
        },
      };
      mockGetSession.mockResolvedValueOnce(mockSession);

      const result = await getAuthenticatedUser();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
    });

    it('should return null when session exists but user is undefined', async () => {
      const mockSession = {
        user: undefined,
        tokenSet: {
          accessToken: 'mock-access-token',
          expiresAt: Date.now() + 3600000,
        },
        internal: {
          sid: 'mock-session-id',
          createdAt: Date.now(),
        },
      };
      mockGetSession.mockResolvedValueOnce(mockSession);

      const result = await getAuthenticatedUser();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
    });

    it('should propagate error when getSession throws', async () => {
      const error = new Error('Auth0 error');
      mockGetSession.mockRejectedValueOnce(error);

      await expect(getAuthenticatedUser()).rejects.toThrow('Auth0 error');
    });
  });

  describe('handleUserSession', () => {
    const mockAuth0Id = 'auth0|123456';

    it('should call all required functions and return onboarding status', async () => {
      const mockOnboardingStatus = true;
      mockCreateUser.mockResolvedValueOnce(undefined);
      mockUpdateLastLogin.mockResolvedValueOnce(undefined);
      mockGetUserOnboardingStatus.mockResolvedValueOnce(mockOnboardingStatus);

      const result = await handleUserSession(mockAuth0Id);

      expect(mockCreateUser).toHaveBeenCalledWith(mockAuth0Id);
      expect(mockUpdateLastLogin).toHaveBeenCalledWith(mockAuth0Id);
      expect(mockGetUserOnboardingStatus).toHaveBeenCalledWith(mockAuth0Id);
      expect(result).toEqual(mockOnboardingStatus);
    });

    it('should handle createUser and updateLastLogin in parallel', async () => {
      const mockOnboardingStatus = false;
      let createUserResolved = false;
      let updateLastLoginResolved = false;

      mockCreateUser.mockImplementation(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        createUserResolved = true;
      });

      mockUpdateLastLogin.mockImplementation(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        updateLastLoginResolved = true;
      });

      mockGetUserOnboardingStatus.mockResolvedValueOnce(mockOnboardingStatus);

      const result = await handleUserSession(mockAuth0Id);

      expect(createUserResolved).toBe(true);
      expect(updateLastLoginResolved).toBe(true);
      expect(result).toEqual(mockOnboardingStatus);
    });

    it('should throw error if createUser fails', async () => {
      const error = new Error('Database error');
      mockCreateUser.mockRejectedValueOnce(error);
      mockUpdateLastLogin.mockResolvedValueOnce(undefined);

      await expect(handleUserSession(mockAuth0Id)).rejects.toThrow(
        'Database error'
      );

      expect(mockCreateUser).toHaveBeenCalledWith(mockAuth0Id);
      expect(mockUpdateLastLogin).toHaveBeenCalledWith(mockAuth0Id);
      expect(mockGetUserOnboardingStatus).not.toHaveBeenCalled();
    });

    it('should throw error if updateLastLogin fails', async () => {
      const error = new Error('Update failed');
      mockCreateUser.mockResolvedValueOnce(undefined);
      mockUpdateLastLogin.mockRejectedValueOnce(error);

      await expect(handleUserSession(mockAuth0Id)).rejects.toThrow(
        'Update failed'
      );

      expect(mockCreateUser).toHaveBeenCalledWith(mockAuth0Id);
      expect(mockUpdateLastLogin).toHaveBeenCalledWith(mockAuth0Id);
      expect(mockGetUserOnboardingStatus).not.toHaveBeenCalled();
    });

    it('should throw error if getUserOnboardingStatus fails', async () => {
      const error = new Error('Onboarding status error');
      mockCreateUser.mockResolvedValueOnce(undefined);
      mockUpdateLastLogin.mockResolvedValueOnce(undefined);
      mockGetUserOnboardingStatus.mockRejectedValueOnce(error);

      await expect(handleUserSession(mockAuth0Id)).rejects.toThrow(
        'Onboarding status error'
      );

      expect(mockCreateUser).toHaveBeenCalledWith(mockAuth0Id);
      expect(mockUpdateLastLogin).toHaveBeenCalledWith(mockAuth0Id);
      expect(mockGetUserOnboardingStatus).toHaveBeenCalledWith(mockAuth0Id);
    });

    it('should handle special characters in auth0Id', async () => {
      const specialAuth0Id = 'auth0|user@domain.com';
      const mockOnboardingStatus = true;
      mockCreateUser.mockResolvedValueOnce(undefined);
      mockUpdateLastLogin.mockResolvedValueOnce(undefined);
      mockGetUserOnboardingStatus.mockResolvedValueOnce(mockOnboardingStatus);

      const result = await handleUserSession(specialAuth0Id);

      expect(mockCreateUser).toHaveBeenCalledWith(specialAuth0Id);
      expect(mockUpdateLastLogin).toHaveBeenCalledWith(specialAuth0Id);
      expect(mockGetUserOnboardingStatus).toHaveBeenCalledWith(specialAuth0Id);
      expect(result).toEqual(mockOnboardingStatus);
    });

    it('should handle empty auth0Id', async () => {
      const emptyAuth0Id = '';
      const mockOnboardingStatus = false;
      mockCreateUser.mockResolvedValueOnce(undefined);
      mockUpdateLastLogin.mockResolvedValueOnce(undefined);
      mockGetUserOnboardingStatus.mockResolvedValueOnce(mockOnboardingStatus);

      const result = await handleUserSession(emptyAuth0Id);

      expect(mockCreateUser).toHaveBeenCalledWith(emptyAuth0Id);
      expect(mockUpdateLastLogin).toHaveBeenCalledWith(emptyAuth0Id);
      expect(mockGetUserOnboardingStatus).toHaveBeenCalledWith(emptyAuth0Id);
      expect(result).toEqual(mockOnboardingStatus);
    });
  });
});
