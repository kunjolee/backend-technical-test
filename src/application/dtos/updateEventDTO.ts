import {
  validateName,
  validateDescription,
  validateDate,
  validateLocation,
  validateOrganizer
} from '../validators/eventValidators'

/**
 * Data Transfer Object for updating an event.
 */
export class UpdateEventDTO {
  constructor(
    public name?: string,
    public description?: string,
    public date?: string,
    public location?: string,
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
    this.validateField('Name', this.name, errors, validateName)
    this.validateField(
      'Description',
      this.description,
      errors,
      validateDescription
    )
    this.validateField('Date', this.date, errors, validateDate)
    this.validateField('Location', this.location, errors, validateLocation)
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
    validator: (value: any, errors: string[]) => void
  ): void {
    if (value !== undefined) {
      if (value === '') {
        errors.push(`${fieldName} cannot be empty`)
      } else {
        validator(value, errors)
      }
    }
  }
}
