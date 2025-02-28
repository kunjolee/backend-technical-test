import Event from '../models/event'

export interface EventRepository {
  save(event: Event): Promise<Event>
  findById(id: number): Promise<Event | null>
}
