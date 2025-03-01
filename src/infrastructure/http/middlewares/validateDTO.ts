import { Request, Response, NextFunction } from 'express'
import { EVENT_ALLOWED_BODY_FIELDS } from '../../../application/constants/eventConstants'

/**
 * Interface representing a validatable Data Transfer Object (DTO).
 */
interface ValidatableDTO {
  new (...args: any[]): { validate: () => string[] }
}

/**
 * Middleware to validate a Data Transfer Object (DTO).
 *
 * @param {ValidatableDTO} dtoClass - The DTO class to validate.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Middleware function to validate the DTO.
 */
export function validateDTO(dtoClass: ValidatableDTO) {
  return (req: Request, res: Response, next: NextFunction) => {
    const bodyFields = Object.keys(req.body)
    // Identify any invalid fields that are not allowed in the DTO
    const invalidFields = bodyFields.filter(
      (field) => !EVENT_ALLOWED_BODY_FIELDS.includes(field)
    )

    if (invalidFields.length > 0) {
      // If there are invalid fields, respond with a 400 status and the invalid fields
      res.status(400).json({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(', ')}`,
        error: 'Bad Request'
      })
      return
    }

    // Create an instance of the DTO class with the request body
    const dto = new dtoClass(
      req.body.name,
      req.body.description,
      req.body.date,
      req.body.location,
      req.body.organizer
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
