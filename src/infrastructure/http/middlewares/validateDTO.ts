import { Request, Response, NextFunction } from 'express'
import { ALLOWED_EVENT_BODY_FIELDS } from '../../../application/constants/eventConstants'
import { handleBadRequest } from '../utils/handleError'

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
    const invalidFields = bodyFields.filter(
      (field) => !ALLOWED_EVENT_BODY_FIELDS.includes(field)
    )

    if (invalidFields.length > 0) {
      res
        .status(400)
        .json(handleBadRequest(`Invalid field(s): ${invalidFields.join(', ')}`))

      return
    }

    const dto = new dtoClass(
      req.body.name,
      req.body.description,
      req.body.date,
      req.body.location,
      req.body.organizer
    )

    const errors = dto.validate()
    if (errors.length > 0) {
      res.status(400).json(handleBadRequest(errors))
      return
    }

    req.body = dto
    next()
  }
}
