import { EventRepository } from '../../domain/repositories/eventRepository'
import Event from '../../domain/models/event'

/**
 * Class representing the use case for retrieving an event by ID.
 */
export class GetEventById {
  constructor(private eventRepository: EventRepository) {}

  /**
   * Executes the use case to retrieve an event by ID.
   *
   * @param {number} id - The ID of the event.
   * @returns {Promise<Event | null>} The found event or null if not found.
   */
  async execute(id: number): Promise<Event | null> {
    const event = await this.eventRepository.findById(id)
    return event
  }
}
