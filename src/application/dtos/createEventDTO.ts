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

    // Validar name
    this.validateName(errors)

    // Validar description
    this.validateDescription(errors)

    // Validar date
    this.validateDate(errors)

    // Validar location
    this.validateLocation(errors)

    // Validar organizer
    this.validateOrganizer(errors)

    return errors
  }

  /**
   * Validates the name field.
   *
   * @param {string[]} errors - The array to store validation error messages.
   */
  private validateName(errors: string[]): void {
    if (!this.name) {
      errors.push('Name is required')
    } else if (typeof this.name !== 'string') {
      errors.push('Name must be a string')
    } else if (this.name.length > 100) {
      errors.push('Name must not exceed 100 characters')
    }
  }

  /**
   * Validates the description field.
   *
   * @param {string[]} errors - The array to store validation error messages.
   */
  private validateDescription(errors: string[]): void {
    if (this.description && typeof this.description !== 'string') {
      errors.push('Description must be a string')
    } else if (this.description && this.description.length > 500) {
      errors.push('Description must not exceed 500 characters')
    }
  }

  /**
   * Validates the date field.
   *
   * @param {string[]} errors - The array to store validation error messages.
   */
  private validateDate(errors: string[]): void {
    if (!this.date) {
      errors.push('Date is required')
    } else if (typeof this.date !== 'string') {
      errors.push('Date must be a string')
    } else if (!this.isValidDate(this.date)) {
      errors.push('Date must be in YYYY-MM-DD format')
    } else if (new Date(this.date) <= new Date()) {
      errors.push('Date must be in the future')
    }
  }

  /**
   * Validates the location field.
   *
   * @param {string[]} errors - The array to store validation error messages.
   */
  private validateLocation(errors: string[]): void {
    if (!this.location) {
      errors.push('Location is required')
    } else if (typeof this.location !== 'string') {
      errors.push('Location must be a string')
    } else if (this.location.length > 200) {
      errors.push('Location must not exceed 200 characters')
    }
  }

  /**
   * Validates the organizer field.
   *
   * @param {string[]} errors - The array to store validation error messages.
   */
  private validateOrganizer(errors: string[]): void {
    if (this.organizer && typeof this.organizer !== 'string') {
      errors.push('Organizer must be a string')
    } else if (this.organizer && this.organizer.length > 50) {
      errors.push('Organizer must not exceed 50 characters')
    }
  }

  /**
   * Checks if a date string is in the format YYYY-MM-DD.
   *
   * @param {string} dateString - The date string to validate.
   * @returns {boolean} True if the date string is valid, false otherwise.
   */
  private isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    return regex.test(dateString) && !isNaN(Date.parse(dateString))
  }
}
