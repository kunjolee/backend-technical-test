export interface EventType {
  id: number | null
  name: string
  description: string
  date: Date
  location: string
  organizer: string
  createdAt: Date | null
  updatedAt: Date | null
}
