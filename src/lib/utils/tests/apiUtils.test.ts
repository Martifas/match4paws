/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserFromSession,
  createErrorResponse,
  createSuccessResponse,
  validateJsonBody,
} from '../apiUtils';

vi.mock('@/lib/auth0', () => ({
  auth0: {
    getSession: vi.fn(),
  },
}));

vi.mock('@/lib/queries/users', () => ({
  getUserByAuth0Id: vi.fn(),
}));

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn(),
  },
}));

import { auth0 } from '@/lib/auth0';
import { getUserByAuth0Id } from '@/lib/queries/users';

const mockGetSession = vi.mocked(auth0.getSession);
const mockGetUserByAuth0Id = vi.mocked(getUserByAuth0Id);
const mockNextResponseJson = vi.mocked(NextResponse.json);

interface TestRequestBody {
  name: string;
  email: string;
  age?: number;
}

describe('apiUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getUserFromSession', () => {
    it('should return user id when session and user exist', async () => {
      const mockSession = {
        user: { sub: 'auth0|123456' },
        tokenSet: {
          accessToken: 'mock-access-token',
          expiresAt: Date.now() + 3600000,
        },
        internal: {
          sid: 'mock-session-id',
          createdAt: Date.now(),
        },
      };
      const mockUser = { id: 'user-123', auth0Id: 'auth0|123456' };

      mockGetSession.mockResolvedValueOnce(mockSession);
      mockGetUserByAuth0Id.mockResolvedValueOnce(mockUser);

      const result = await getUserFromSession();

      expect(result).toBe('user-123');
      expect(mockGetSession).toHaveBeenCalledOnce();
      expect(mockGetUserByAuth0Id).toHaveBeenCalledWith('auth0|123456');
    });

    it('should return null when session is null', async () => {
      mockGetSession.mockResolvedValueOnce(null);

      const result = await getUserFromSession();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
      expect(mockGetUserByAuth0Id).not.toHaveBeenCalled();
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

      const result = await getUserFromSession();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
      expect(mockGetUserByAuth0Id).not.toHaveBeenCalled();
    });

    it('should return null when session user has no sub', async () => {
      const mockSession = {
        user: { email: 'test@example.com' } as any,
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

      const result = await getUserFromSession();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
      expect(mockGetUserByAuth0Id).not.toHaveBeenCalled();
    });

    it('should return null when user is not found in database', async () => {
      const mockSession = {
        user: { sub: 'auth0|123456' },
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
      mockGetUserByAuth0Id.mockResolvedValueOnce(null);

      const result = await getUserFromSession();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
      expect(mockGetUserByAuth0Id).toHaveBeenCalledWith('auth0|123456');
    });

    it('should return null when user exists but has no id', async () => {
      const mockSession = {
        user: { sub: 'auth0|123456' },
        tokenSet: {
          accessToken: 'mock-access-token',
          expiresAt: Date.now() + 3600000,
        },
        internal: {
          sid: 'mock-session-id',
          createdAt: Date.now(),
        },
      };
      const mockUser = { auth0Id: 'auth0|123456' } as any;

      mockGetSession.mockResolvedValueOnce(mockSession);
      mockGetUserByAuth0Id.mockResolvedValueOnce(mockUser);

      const result = await getUserFromSession();

      expect(result).toBeNull();
      expect(mockGetSession).toHaveBeenCalledOnce();
      expect(mockGetUserByAuth0Id).toHaveBeenCalledWith('auth0|123456');
    });

    it('should propagate error when getSession throws', async () => {
      const error = new Error('Auth0 error');
      mockGetSession.mockRejectedValueOnce(error);

      await expect(getUserFromSession()).rejects.toThrow('Auth0 error');
    });

    it('should propagate error when getUserByAuth0Id throws', async () => {
      const mockSession = {
        user: { sub: 'auth0|123456' },
        tokenSet: {
          accessToken: 'mock-access-token',
          expiresAt: Date.now() + 3600000,
        },
        internal: {
          sid: 'mock-session-id',
          createdAt: Date.now(),
        },
      };
      const error = new Error('Database error');

      mockGetSession.mockResolvedValueOnce(mockSession);
      mockGetUserByAuth0Id.mockRejectedValueOnce(error);

      await expect(getUserFromSession()).rejects.toThrow('Database error');
    });

    it('should ignore req parameter (not used in current implementation)', async () => {
      const mockRequest = {} as NextRequest;
      const mockSession = {
        user: { sub: 'auth0|123456' },
        tokenSet: {
          accessToken: 'mock-access-token',
          expiresAt: Date.now() + 3600000,
        },
        internal: {
          sid: 'mock-session-id',
          createdAt: Date.now(),
        },
      };
      const mockUser = { id: 'user-123', auth0Id: 'auth0|123456' };

      mockGetSession.mockResolvedValueOnce(mockSession);
      mockGetUserByAuth0Id.mockResolvedValueOnce(mockUser);

      const result = await getUserFromSession(mockRequest);

      expect(result).toBe('user-123');
    });
  });

  describe('createErrorResponse', () => {
    it('should create error response with message and status', () => {
      const mockResponse = { json: 'mock-response' };
      mockNextResponseJson.mockReturnValueOnce(mockResponse as any);

      const result = createErrorResponse('Test error', 400);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Test error' },
        { status: 400 }
      );
      expect(result).toBe(mockResponse);
    });

    it('should handle different status codes', () => {
      const mockResponse = { json: 'mock-response' };
      mockNextResponseJson.mockReturnValueOnce(mockResponse as any);

      createErrorResponse('Not found', 404);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Not found' },
        { status: 404 }
      );
    });

    it('should handle empty error message', () => {
      const mockResponse = { json: 'mock-response' };
      mockNextResponseJson.mockReturnValueOnce(mockResponse as any);

      createErrorResponse('', 500);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: '' },
        { status: 500 }
      );
    });
  });

  describe('createSuccessResponse', () => {
    it('should create success response without data', () => {
      const mockResponse = { json: 'mock-response' };
      mockNextResponseJson.mockReturnValueOnce(mockResponse as any);

      const result = createSuccessResponse();

      expect(mockNextResponseJson).toHaveBeenCalledWith({ success: true });
      expect(result).toBe(mockResponse);
    });

    it('should create success response with data', () => {
      const mockResponse = { json: 'mock-response' };
      const testData = { userId: '123', message: 'Created successfully' };
      mockNextResponseJson.mockReturnValueOnce(mockResponse as any);

      const result = createSuccessResponse(testData);

      expect(mockNextResponseJson).toHaveBeenCalledWith({
        success: true,
        userId: '123',
        message: 'Created successfully',
      });
      expect(result).toBe(mockResponse);
    });

    it('should handle null data', () => {
      const mockResponse = { json: 'mock-response' };
      mockNextResponseJson.mockReturnValueOnce(mockResponse as any);

      createSuccessResponse(null);

      expect(mockNextResponseJson).toHaveBeenCalledWith({ success: true });
    });

    it('should handle undefined data', () => {
      const mockResponse = { json: 'mock-response' };
      mockNextResponseJson.mockReturnValueOnce(mockResponse as any);

      createSuccessResponse(undefined);

      expect(mockNextResponseJson).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('validateJsonBody', () => {
    const createMockRequest = (body: any): NextRequest => {
      return {
        json: vi.fn().mockResolvedValue(body),
      } as any;
    };

    it('should return parsed body when all required fields are present', async () => {
      const requestBody = { name: 'John', email: 'john@example.com', age: 30 };
      const mockRequest = createMockRequest(requestBody);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'email',
      ]);

      expect(result).toEqual(requestBody);
    });

    it('should return error response when required field is missing', async () => {
      const requestBody = { name: 'John' };
      const mockRequest = createMockRequest(requestBody);
      const mockErrorResponse = { error: 'mock-error-response' };
      mockNextResponseJson.mockReturnValueOnce(mockErrorResponse as any);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'email',
      ]);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Missing required field: email' },
        { status: 400 }
      );
      expect(result).toBe(mockErrorResponse);
    });

    it('should return error response when required field is null', async () => {
      const requestBody = { name: 'John', email: null };
      const mockRequest = createMockRequest(requestBody);
      const mockErrorResponse = { error: 'mock-error-response' };
      mockNextResponseJson.mockReturnValueOnce(mockErrorResponse as any);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'email',
      ]);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Missing required field: email' },
        { status: 400 }
      );
      expect(result).toBe(mockErrorResponse);
    });

    it('should return error response when required field is empty string', async () => {
      const requestBody = { name: '', email: 'john@example.com' };
      const mockRequest = createMockRequest(requestBody);
      const mockErrorResponse = { error: 'mock-error-response' };
      mockNextResponseJson.mockReturnValueOnce(mockErrorResponse as any);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'email',
      ]);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Missing required field: name' },
        { status: 400 }
      );
      expect(result).toBe(mockErrorResponse);
    });

    it('should return error response when required field is undefined', async () => {
      const requestBody = { name: 'John', email: undefined };
      const mockRequest = createMockRequest(requestBody);
      const mockErrorResponse = { error: 'mock-error-response' };
      mockNextResponseJson.mockReturnValueOnce(mockErrorResponse as any);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'email',
      ]);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Missing required field: email' },
        { status: 400 }
      );
      expect(result).toBe(mockErrorResponse);
    });

    it('should allow optional fields to be missing', async () => {
      const requestBody = { name: 'John', email: 'john@example.com' };
      const mockRequest = createMockRequest(requestBody);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'email',
      ]);

      expect(result).toEqual(requestBody);
    });

    it('should return error response when JSON parsing fails', async () => {
      const mockRequest = {
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as any;
      const mockErrorResponse = { error: 'mock-error-response' };
      mockNextResponseJson.mockReturnValueOnce(mockErrorResponse as any);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'email',
      ]);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
      expect(result).toBe(mockErrorResponse);
    });

    it('should handle empty required fields array', async () => {
      const requestBody = { name: 'John' };
      const mockRequest = createMockRequest(requestBody);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, []);

      expect(result).toEqual(requestBody);
    });

    it('should handle boolean false as missing field', async () => {
      const requestBody = { name: 'John', email: false };
      const mockRequest = createMockRequest(requestBody);
      const mockErrorResponse = { error: 'mock-error-response' };
      mockNextResponseJson.mockReturnValueOnce(mockErrorResponse as any);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'email',
      ]);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Missing required field: email' },
        { status: 400 }
      );
      expect(result).toBe(mockErrorResponse);
    });

    it('should handle number 0 as missing field', async () => {
      const requestBody = { name: 'John', age: 0 };
      const mockRequest = createMockRequest(requestBody);
      const mockErrorResponse = { error: 'mock-error-response' };
      mockNextResponseJson.mockReturnValueOnce(mockErrorResponse as any);

      const result = await validateJsonBody<TestRequestBody>(mockRequest, [
        'name',
        'age',
      ]);

      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: 'Missing required field: age' },
        { status: 400 }
      );
      expect(result).toBe(mockErrorResponse);
    });
  });
});
