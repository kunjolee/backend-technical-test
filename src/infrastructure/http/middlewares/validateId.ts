import { Request, Response, NextFunction } from 'express'

/**
 * Middleware to validate that the `id` parameter is a valid number.
 */
export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { id } = req.params

  // Regex to check if the ID is a valid number (only digits)
  const isValidNumber = /^\d+$/.test(id)

  if (!isValidNumber) {
    // If the ID is not a valid number, respond with a 400 status
    res.status(400).json({
      status: 400,
      message: 'Invalid ID parameter. Only numbers are allowed.',
      error: 'Bad Request'
    })
    return
  }

  // If the ID is valid, proceed to the next middleware or route handler
  next()
}
