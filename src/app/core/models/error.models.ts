/**
 * Error handling models
 */

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  timestamp: Date;
}

export interface ErrorState {
  error: ApiError | null;
  isVisible: boolean;
}

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public context?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}
