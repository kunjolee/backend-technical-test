import { Request, Response } from 'express'
import { CreateEvent } from '../../../application/use-cases/createEvent'
import { EventRepositoryImpl } from '../../repositories/eventRepositoryImpl'
import { GetAllEvents } from '../../../application/use-cases/getAllEvents'

/**
 * Class representing the event controller.
 */
export class EventController {
  private eventRepository: EventRepositoryImpl
  private createEventUseCase: CreateEvent
  private getAllEventsUseCase: GetAllEvents

  constructor() {
    this.eventRepository = new EventRepositoryImpl()
    this.createEventUseCase = new CreateEvent(this.eventRepository)
    this.getAllEventsUseCase = new GetAllEvents(this.eventRepository)
  }

  /**
   * Creates a new event.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  public async createEvent(req: Request, res: Response): Promise<void> {
    const { name, description, date, location, organizer } = req.body
    try {
      const event = await this.createEventUseCase.execute({
        name,
        description,
        date,
        location,
        organizer
      })
      res.status(201).json(event)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  /**
   * Updates an existing event.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  public updateEvent(req: Request, res: Response): void {
    // Logic to update an event
    res.json({ message: 'Event updated successfully' })
  }

  /**
   * Deletes an event.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  public deleteEvent(req: Request, res: Response): void {
    // Logic to delete an event
    res.json({ message: 'Event deleted successfully' })
  }

  /**
   * Retrieves all events.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  public async getAllEvents(req: Request, res: Response): Promise<void> {
    const { location, date, organizer } = req.query
    try {
      const events = await this.getAllEventsUseCase.execute({
        location: location as string,
        date: date ? new Date(date as string) : undefined,
        organizer: organizer as string
      })
      res.status(200).json(events)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  /**
   * Retrieves an event by its ID.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  public getEventById(req: Request, res: Response): void {
    // Logic to get an event by ID
    res.json({ event: {} })
  }
}
