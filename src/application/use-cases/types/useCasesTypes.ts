export interface EventType {
  id?: number | null
  name: string
  description: string
  date: string
  location: string
  organizer: string
  created_at?: Date | null
  updated_at?: Date | null
}
