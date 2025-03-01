import { HandleErrorResponse } from './types/handleErrorType'

/**
 * Creates an error response object.
 *
 * @param {number} status - The HTTP status code.
 * @param {string} message - The error message.
 * @param {string} errorType - The type of error.
 * @returns {Object} The error response object.
 */
export const createErrorResponse = ({
  status,
  message,
  error
}: HandleErrorResponse): HandleErrorResponse => ({
  status,
  message,
  error
})

/**
 * Handles common errors and creates an appropriate error response.
 * Add more common errors as needed.
 *
 * @param {any} error - The error object.
 * @returns {Object} The error response object.
 */
export const handleCommonErrors = (error: any): HandleErrorResponse => {
  return error.message === 'Event not found' || 'No events found'
    ? createErrorResponse({
        status: 404,
        message: error.message,
        error: '404 Not Found'
      })
    : createErrorResponse({
        status: 500,
        message: error.message,
        error: 'Internal Server Error'
      })
}

export const handleBadRequest = (
  message: string | string[]
): HandleErrorResponse =>
  createErrorResponse({
    status: 400,
    message,
    error: 'Bad Request'
  })
