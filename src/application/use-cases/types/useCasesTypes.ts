export interface EventType {
  id?: number | null
  name: string
  description: string
  date: string
  location: string
  organizer: string
  createdAt?: Date | null
  updatedAt?: Date | null
}
