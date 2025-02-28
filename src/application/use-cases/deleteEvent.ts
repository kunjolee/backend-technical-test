import { EventRepository } from '../../domain/repositories/eventRepository'

/**
 * Class representing the use case for deleting an event by ID.
 */
export class DeleteEvent {
  constructor(private eventRepository: EventRepository) {}

  /**
   * Executes the use case to delete an event by ID.
   *
   * @param {number} id - The ID of the event.
   * @returns {Promise<void>}
   */
  async execute(id: number): Promise<void> {
    const event = await this.eventRepository.findById(id)
    if (!event) {
      throw new Error('Event not found')
    }
    await this.eventRepository.deleteById(id)
  }
}
