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
    public name: string,
    public description: string | null,
    public date: string,
    public location: string,
    public organizer: string | null
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
