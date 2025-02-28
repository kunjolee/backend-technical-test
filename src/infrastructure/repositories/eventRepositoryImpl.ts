import Event from '../../domain/models/event'
import { EventRepository } from '../../domain/repositories/eventRepository'
import EventModel from '../database/models/eventModel'

export class EventRepositoryImpl implements EventRepository {
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

  private toPersistence(event: Event): Partial<EventModel> {
    return {
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      organizer: event.organizer
    }
  }

  async save(event: Event): Promise<Event> {
    const eventData = this.toPersistence(event)
    const eventModel = await EventModel.create(eventData)
    return this.toDomain(eventModel)
  }

  async findById(id: number): Promise<Event | null> {
    const eventModel = await EventModel.findByPk(id)
    if (!eventModel) return null
    return this.toDomain(eventModel)
  }
}
