/**
 * Recursively removes fields with `null` values from an object or array.
 * Preserves instances of Date without attempting to clean them.
 *
 * @param {T} data - The object or array to clean.
 * @returns {T} The cleaned object or array.
 */
function removeNullFields<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map(removeNullFields) as T
  } else if (data && typeof data === 'object' && !(data instanceof Date)) {
    return Object.fromEntries(
      Object.entries(data)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => [key, removeNullFields(value)])
    ) as T
  }
  return data
}

export default removeNullFields
