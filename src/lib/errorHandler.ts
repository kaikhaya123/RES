// Error handler utility for consistent error handling across the app
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

// Global error handler
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    return new AppError(500, error.message, false)
  }

  return new AppError(500, 'An unexpected error occurred', false)
}

// API error handler
export const apiErrorHandler = (error: any) => {
  const statusCode = error?.response?.status || 500
  const message = error?.response?.data?.message || error?.message || 'An error occurred'

  return {
    statusCode,
    message,
    error: error?.response?.data || null,
  }
}

// Network error handler with retry logic
export const withRetry = async <T,>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxAttempts) {
        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, delayMs * Math.pow(2, attempt - 1))
        )
      }
    }
  }

  throw lastError || new Error('Max retry attempts exceeded')
}

// Request timeout handler
export const withTimeout = <T,>(
  promise: Promise<T>,
  timeoutMs: number = 30000
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Request timeout after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ])
}
