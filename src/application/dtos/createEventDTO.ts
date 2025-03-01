import {
  validateName,
  validateDescription,
  validateDate,
  validateLocation,
  validateOrganizer
} from '../validators/eventValidators'

/**
 * Data Transfer Object for creating an event.
 */
export class CreateEventDTO {
  constructor(
    private name: string,
    private description: string | null,
    private date: string,
    private location: string,
    private organizer: string | null
  ) {}

  /**
   * Validates the DTO fields.
   *
   * @returns {string[]} An array of validation error messages.
   */
  validate(): string[] {
    const errors: string[] = []
    const isRequired = true

    validateName(this.name, errors, isRequired)
    validateDescription(this.description, errors)
    validateDate(this.date, errors, isRequired)
    validateLocation(this.location, errors, isRequired)
    validateOrganizer(this.organizer, errors)
    return errors
  }
}
