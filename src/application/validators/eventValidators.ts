export function validateName(
  name: string,
  errors: string[],
  isRequired: boolean = false
): void {
  if (!name && isRequired) {
    errors.push('Name is required')
  } else if (typeof name !== 'string') {
    errors.push('Name must be a string')
  } else if (name.length > 100) {
    errors.push('Name must not exceed 100 characters')
  }
}

export function validateDescription(
  description: string | null,
  errors: string[]
): void {
  if (description && typeof description !== 'string') {
    errors.push('Description must be a string')
  } else if (description && description.length > 500) {
    errors.push('Description must not exceed 500 characters')
  }
}

export function validateDate(
  date: string,
  errors: string[],
  isRequired: boolean = false
): void {
  if (!date && isRequired) {
    errors.push('Date is required')
  } else if (typeof date !== 'string') {
    errors.push('Date must be a string')
  } else if (!isValidDate(date)) {
    errors.push('Date must be in YYYY-MM-DD format')
  } else if (new Date(date) <= new Date()) {
    errors.push('Date must be in the future')
  }
}

export function validateLocation(
  location: string,
  errors: string[],
  isRequired: boolean = false
): void {
  if (!location && isRequired) {
    errors.push('Location is required')
  } else if (typeof location !== 'string') {
    errors.push('Location must be a string')
  } else if (location.length > 200) {
    errors.push('Location must not exceed 200 characters')
  }
}

export function validateOrganizer(
  organizer: string | null,
  errors: string[]
): void {
  if (organizer && typeof organizer !== 'string') {
    errors.push('Organizer must be a string')
  } else if (organizer && organizer.length > 50) {
    errors.push('Organizer must not exceed 50 characters')
  }
}

export function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  return regex.test(dateString) && !isNaN(Date.parse(dateString))
}
