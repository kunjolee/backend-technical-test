export default class Event {
  constructor(
    public id: number | null,
    public name: string,
    public description: string,
    public date: Date,
    public location: string,
    public organizer: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
