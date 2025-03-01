import { Request, Response, NextFunction } from 'express'
import { CreateEventDTO } from '../../../application/dtos/createEventDTO'

/**
 * Middleware to validate a Data Transfer Object (DTO).
 *
 * @param {typeof CreateEventDTO} dtoClass - The DTO class to validate.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Middleware function to validate the DTO.
 */
export function validateDTO(dtoClass: typeof CreateEventDTO) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Create an instance of the DTO class with the request body
    const dto = new dtoClass(
      req.body.name,
      req.body.description || null,
      req.body.date,
      req.body.location,
      req.body.organizer || null
    )

    // Validate the DTO instance
    const errors = dto.validate()
    if (errors.length > 0) {
      // If there are validation errors, respond with a 400 status and the errors
      res.status(400).json({
        status: 400,
        message: errors,
        error: 'Bad Request'
      })
    } else {
      // If validation passes, replace the request body with the DTO instance and proceed
      req.body = dto
      next()
    }
  }
}
