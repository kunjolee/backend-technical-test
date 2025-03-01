import { Request, Response, NextFunction } from 'express'
import { handleBadRequest } from '../utils/handleError'

/**
 * Middleware to validate that the `id` parameter is a valid number.
 */
export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { id } = req.params

  const isValidNumber = /^\d+$/.test(id)

  if (!isValidNumber) {
    res
      .status(400)
      .json(handleBadRequest('Invalid ID parameter. Only numbers are allowed.'))
    return
  }

  next()
}
