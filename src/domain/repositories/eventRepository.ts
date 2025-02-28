import Event from '../models/event'

export interface EventRepository {
  save(event: Event): Promise<Event>
  findById(id: number): Promise<Event | null>
  findAll(filters?: findAllType): Promise<Event[]>
  deleteById(id: number): Promise<void>
  update(event: Event): Promise<Event>
}
