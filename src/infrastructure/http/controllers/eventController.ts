import { Request, Response } from 'express'
import { CreateEvent } from '../../../application/use-cases/createEvent'
import { EventRepositoryImpl } from '../../repositories/eventRepositoryImpl'
import { GetAllEvents } from '../../../application/use-cases/getAllEvents'
import { GetEventById } from '../../../application/use-cases/getEventById'
import { DeleteEvent } from '../../../application/use-cases/deleteEvent'

/**
 * Class representing the event controller.
 */
export class EventController {
  private eventRepository: EventRepositoryImpl
  private createEventUseCase: CreateEvent
  private getAllEventsUseCase: GetAllEvents
  private getEventByIdUseCase: GetEventById
  private deleteEventUseCase: DeleteEvent

  constructor() {
    this.eventRepository = new EventRepositoryImpl()
    this.createEventUseCase = new CreateEvent(this.eventRepository)
    this.getAllEventsUseCase = new GetAllEvents(this.eventRepository)
    this.getEventByIdUseCase = new GetEventById(this.eventRepository)
    this.deleteEventUseCase = new DeleteEvent(this.eventRepository)
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
   * Deletes an event by its ID.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  public async deleteEvent(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      await this.deleteEventUseCase.execute(Number(id))
      res.status(200).json({ message: 'Event deleted successfully' })
    } catch (error: any) {
      if (error.message === 'Event not found') {
        res.status(404).json({ error: error.message })
      } else {
        res.status(400).json({ error: error.message })
      }
    }
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
  public async getEventById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const event = await this.getEventByIdUseCase.execute(Number(id))
      if (event) {
        res.status(200).json(event)
      } else {
        res.status(404).json({ message: 'Event not found' })
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
