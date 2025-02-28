import { EventRepository } from '../../domain/repositories/eventRepository'
import Event from '../../domain/models/event'

/**
 * Class representing the use case for retrieving all events with optional filters.
 */
export class GetAllEvents {
  constructor(private eventRepository: EventRepository) {}

  /**
   * Executes the use case to retrieve all events with optional filters.
   *
   * @param {Object} [filters] - The filters to apply.
   * @param {string} [filters.location] - The optional location filter.
   * @param {Date} [filters.date] - The optional date filter.
   * @param {string} [filters.organizer] - The optional organizer filter.
   * @returns {Promise<Event[]>} The found events.
   */
  async execute(filters?: findAllType): Promise<Event[]> {
    const events = await this.eventRepository.findAll(filters)
    return events
  }
}
