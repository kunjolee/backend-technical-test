import Event from '../../domain/models/event'
import { EventRepository } from '../../domain/repositories/eventRepository'
import { EventType } from './types/useCasesTypes'

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

    const savedEvent = await this.eventRepository.save(event)
    return savedEvent
  }
}
