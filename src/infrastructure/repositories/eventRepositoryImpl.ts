import Event from '../../domain/models/event'
import { EventRepository } from '../../domain/repositories/eventRepository'
import EventModel from '../database/models/eventModel'

/**
 * Class representing the implementation of the EventRepository.
 */
export class EventRepositoryImpl implements EventRepository {
  /**
   * Converts an EventModel instance to a domain Event instance.
   *
   * @param {EventModel} eventModel - The EventModel instance.
   * @returns {Event} The domain Event instance.
   */
  private toDomain(eventModel: EventModel): Event {
    return new Event(
      eventModel.id,
      eventModel.name,
      eventModel.description,
      eventModel.date,
      eventModel.location,
      eventModel.organizer,
      eventModel.createdAt,
      eventModel.updatedAt
    )
  }

  /**
   * Converts a domain Event instance to a persistence EventModel instance.
   *
   * @param {Event} event - The domain Event instance.
   * @returns {Partial<EventModel>} The persistence EventModel instance.
   */
  private toPersistence(event: Event): Partial<EventModel> {
    return {
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      organizer: event.organizer
    }
  }

  /**
   * Saves an event to the database.
   *
   * @param {Event} event - The event to save.
   * @returns {Promise<Event>} The saved event.
   */
  async save(event: Event): Promise<Event> {
    const eventData = this.toPersistence(event)
    const eventModel = await EventModel.create(eventData)
    return this.toDomain(eventModel)
  }

  /**
   * Finds an event by its ID.
   *
   * @param {number} id - The ID of the event.
   * @returns {Promise<Event | null>} The found event or null if not found.
   */
  async findById(id: number): Promise<Event | null> {
    const eventModel = await EventModel.findByPk(id)
    if (!eventModel) return null
    return this.toDomain(eventModel)
  }

  /**
   * Finds all events matching the given filters.
   *
   * @param {Object} [filters] - The filters to apply.
   * @param {string} [filters.location] - The optional location filter.
   * @param {Date} [filters.date] - The optional date filter.
   * @param {string} [filters.organizer] - The optional organizer filter.
   * @returns {Promise<Event[]>} The found events.
   */
  async findAll(filters?: findAllType): Promise<Event[]> {
    const whereClause = {
      ...(filters?.location && { location: filters.location }),
      ...(filters?.date && { date: filters.date }),
      ...(filters?.organizer && { organizer: filters.organizer })
    }

    const eventModels = await EventModel.findAll({ where: whereClause })
    return eventModels.map((eventModel) => this.toDomain(eventModel))
  }

  /**
   * Deletes an event by its ID.
   *
   * @param {number} id - The ID of the event.
   * @returns {Promise<void>}
   */
  async deleteById(id: number): Promise<void> {
    await EventModel.destroy({ where: { id } })
  }
}
