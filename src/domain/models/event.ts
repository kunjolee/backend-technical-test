export default class Event {
  constructor(
    public id: number | null,
    public name: string,
    public description: string,
    public date: string,
    public location: string,
    public organizer: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
