/**
 * Validates the name field.
 *
 * @param {string} name - The name to validate.
 * @param {string[]} errors - The array to store validation error messages.
 * @param {boolean} [isRequired=false] - Whether the name is required.
 */
export function validateName(
  name: string,
  errors: string[],
  isRequired: boolean = false
): void {
  if (!name && isRequired) {
    errors.push('Name is required')
  } else if (!validString(name)) {
    errors.push('Name must be a string')
  } else if (name.length > 100) {
    errors.push('Name must not exceed 100 characters')
  }
}

/**
 * Validates the description field.
 *
 * @param {string | null} description - The description to validate.
 * @param {string[]} errors - The array to store validation error messages.
 */
export function validateDescription(
  description: string | null,
  errors: string[]
): void {
  if (description && !validString(description)) {
    errors.push('Description must be a string')
  } else if (description && description.length > 500) {
    errors.push('Description must not exceed 500 characters')
  }
}

/**
 * Validates the date field.
 *
 * @param {string} date - The date to validate.
 * @param {string[]} errors - The array to store validation error messages.
 * @param {boolean} [isRequired=false] - Whether the date is required.
 * @param {boolean} [isFutureEvent=true] - Whether the date must be in the future.
 */
export function validateDate(
  date: string,
  errors: string[],
  isRequired: boolean = false,
  isFutureEvent: boolean = true
): void {
  if (!date && isRequired) {
    errors.push('Date is required')
  } else if (!isValidDate(date)) {
    errors.push('Date must be in YYYY-MM-DD format')
  } else if (isFutureEvent && new Date(date) <= new Date()) {
    errors.push('Date must be in the future')
  } else if (!validString(date)) {
    errors.push('Date must be a string')
  }
}

/**
 * Validates the location field.
 *
 * @param {string} location - The location to validate.
 * @param {string[]} errors - The array to store validation error messages.
 * @param {boolean} [isRequired=false] - Whether the location is required.
 */
export function validateLocation(
  location: string,
  errors: string[],
  isRequired: boolean = false
): void {
  if (!location && isRequired) {
    errors.push('Location is required')
  } else if (!isValidDate(location)) {
    errors.push('Location must be a string')
  } else if (location.length > 200) {
    errors.push('Location must not exceed 200 characters')
  }
}

/**
 * Validates the organizer field.
 *
 * @param {string | null} organizer - The organizer to validate.
 * @param {string[]} errors - The array to store validation error messages.
 */
export function validateOrganizer(
  organizer: string | null,
  errors: string[]
): void {
  if (organizer && !validString(organizer)) {
    errors.push('Organizer must be a string')
  } else if (organizer && organizer.length > 50) {
    errors.push('Organizer must not exceed 50 characters')
  }
}

/**
 * Checks if a date string is in the format YYYY-MM-DD.
 *
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} True if the date string is valid, false otherwise.
 */
export function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  return regex.test(dateString) && !isNaN(Date.parse(dateString))
}

/**
 * Validates that a string contains only letters (a-z, A-Z) and spaces.
 *
 * @param {string} str - The string to validate.
 * @returns {boolean} True if the string is valid, false otherwise.
 */
export function validString(str: string): boolean {
  const regex = /^[a-zA-Z\s]+$/
  return regex.test(str)
}
