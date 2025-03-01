import { Request, Response, NextFunction } from 'express'
import { ALLOWED_EVENT_QUERY_PARAMS } from '../../../application/constants/eventConstants'
import { handleBadRequest } from '../utils/handleError'

/**
 * Interface representing a validatable Data Transfer Object (DTO).
 */
interface ValidatableDTO {
  new (...args: any[]): { validate: () => string[] }
}

/**
 * Middleware to validate query parameters using a Data Transfer Object (DTO).
 *
 * @param {ValidatableDTO} dtoClass - The DTO class to validate.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Middleware function to validate the query parameters.
 */
export function validateQueryParams(dtoClass: ValidatableDTO) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const queryFields = Object.keys(req.query)

    const invalidQueryParams = queryFields.filter(
      (query) => !ALLOWED_EVENT_QUERY_PARAMS.includes(query)
    )

    if (invalidQueryParams.length > 0) {
      res
        .status(400)
        .json(
          handleBadRequest(
            `Invalid query param(s): ${invalidQueryParams.join(', ')}`
          )
        )
      return
    }

    const { location, date, organizer } = req.query

    const dto = new dtoClass(
      location as string | undefined,
      date as string | undefined,
      organizer as string | undefined
    )

    const errors = dto.validate()
    if (errors.length > 0) {
      res.status(400).json(handleBadRequest(errors))
      return
    }

    req.query = dto as any
    next()
  }
}
