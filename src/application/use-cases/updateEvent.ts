import { EventRepository } from '../../domain/repositories/eventRepository'
import Event from '../../domain/models/event'

/**
 * Class representing the use case for updating an event.
 */
export class UpdateEvent {
  constructor(private eventRepository: EventRepository) {}

  /**
   * Executes the use case to update an event.
   *
   * @param {Event} event - The event to update.
   * @returns {Promise<Event>} The updated event.
   * @throws {Error} If the event does not exist.
   */
  async execute(event: Event): Promise<Event> {
    const existingEvent = await this.eventRepository.findById(event.id!)
    if (!existingEvent) {
      throw new Error('Event not found')
    }
    const updatedEvent = await this.eventRepository.update(event)
    return updatedEvent
  }
}
