import Event from '../../domain/models/event'
import { EventRepository } from '../../domain/repositories/eventRepository'
import { EventType } from './types'

export class CreateEvent {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute({
    name,
    description,
    date,
    location,
    organizer
  }: EventType): Promise<Event> {
    const event = new Event(null, name, description, date, location, organizer)

    await this.eventRepository.save(event)
    return event
  }
}
