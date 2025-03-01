import {
  validateLocation,
  validateDate,
  validateOrganizer
} from '../validators/eventValidators'

type ValidatorFunction = {
  (value: any, errors: string[]): void
  (
    value: any,
    errors: string[],
    isRequiredDate: boolean,
    isFutureEventDate: boolean
  ): void
}

/**
 * Data Transfer Object for getting all events with filters.
 */
export class GetAllEventsDTO {
  constructor(
    public location?: string,
    public date?: string,
    public organizer?: string
  ) {}

  /**
   * Validates the DTO fields.
   *
   * @returns {string[]} An array of validation error messages.
   */
  validate(): string[] {
    const errors: string[] = []

    // Validate fields if present
    this.validateField('Location', this.location, errors, validateLocation)
    this.validateField('Date', this.date, errors, validateDate)
    this.validateField('Organizer', this.organizer, errors, validateOrganizer)

    return errors
  }

  /**
   * Validates a field if it is present.
   *
   * @param {string} fieldName - The name of the field.
   * @param {any} value - The value of the field.
   * @param {string[]} errors - The array to store validation error messages.
   * @param {(value: any, errors: string[]) => void} validator - The validation function.
   */
  private validateField(
    fieldName: string,
    value: any,
    errors: string[],
    validator: ValidatorFunction
  ): void {
    if (value === undefined) {
      return
    }

    if (value === '') {
      errors.push(`${fieldName} cannot be empty`)
      return
    }

    fieldName === 'Date'
      ? validator(value, errors, false, false)
      : validator(value, errors)
  }
}
