import { Request, Response, NextFunction } from 'express'
import removeNullFields from '../utils/removeNullField'

/**
 * Middleware to clean JSON responses by removing fields with `null` values.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const cleanNullResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json

  res.json = function (data: any): Response {
    const cleanedData = removeNullFields(data)
    return originalJson.call(this, cleanedData)
  }

  next()
}
