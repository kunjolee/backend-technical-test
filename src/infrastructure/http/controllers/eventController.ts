import { Request, Response } from 'express'
import { CreateEvent } from '../../../application/use-cases/createEvent'
import { EventRepositoryImpl } from '../../repositories/eventRepositoryImpl'
import { GetAllEvents } from '../../../application/use-cases/getAllEvents'
import { GetEventById } from '../../../application/use-cases/getEventById'
import { DeleteEvent } from '../../../application/use-cases/deleteEvent'
import { UpdateEvent } from '../../../application/use-cases/updateEvent'
import { handleCommonErrors } from '../utils/handleError'

/**
 * Class representing the event controller.
 */
export class EventController {
  private eventRepository: EventRepositoryImpl
  private createEventUseCase: CreateEvent
  private getAllEventsUseCase: GetAllEvents
  private getEventByIdUseCase: GetEventById
  private deleteEventUseCase: DeleteEvent
  private updateEventUseCase: UpdateEvent

  constructor() {
    this.eventRepository = new EventRepositoryImpl()
    this.createEventUseCase = new CreateEvent(this.eventRepository)
    this.getAllEventsUseCase = new GetAllEvents(this.eventRepository)
    this.getEventByIdUseCase = new GetEventById(this.eventRepository)
    this.deleteEventUseCase = new DeleteEvent(this.eventRepository)
    this.updateEventUseCase = new UpdateEvent(this.eventRepository)
  }
  /**
   * Creates a new event.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  public async createEvent(req: Request, res: Response): Promise<void> {
    try {
      // Send the request body directly because it was validated by the middleware
      const event = await this.createEventUseCase.execute(req.body)
      res.status(201).json({
        status: 201,
        message: 'Event created successfully',
        data: event
      })
    } catch (error: any) {
      const errorResponse = handleCommonErrors(error)
      res.status(errorResponse.status).json(errorResponse)
    }
  }

  /**
   * Updates an existing event.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  public async updateEvent(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { name, description, date, location, organizer } = req.body
    try {
      const event = await this.updateEventUseCase.execute({
        id: Number(id),
        name,
        description,
        date,
        location,
        organizer
      })

      res.status(200).json({
        status: 200,
        message: 'Event updated successfully',
        data: event
      })
    } catch (error: any) {
      const errorResponse = handleCommonErrors(error)
      res.status(errorResponse.status).json(errorResponse)
    }
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
      res.status(200).json({
        status: 200,
        message: 'Event deleted successfully'
      })
    } catch (error: any) {
      const errorResponse = handleCommonErrors(error)
      res.status(errorResponse.status).json(errorResponse)
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
    try {
      // Send the request query directly because it was validated by the middleware
      const events = await this.getAllEventsUseCase.execute(req.query)

      res.status(200).json({
        status: 200,
        data: events
      })
    } catch (error: any) {
      const errorResponse = handleCommonErrors(error)
      res.status(errorResponse.status).json(errorResponse)
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
        res.status(200).json({
          status: 200,
          data: event
        })
      } else {
        const errorResponse = handleCommonErrors({ message: 'Event not found' })
        res.status(errorResponse.status).json(errorResponse)
      }
    } catch (error: any) {
      const errorResponse = handleCommonErrors(error)
      res.status(errorResponse.status).json(errorResponse)
    }
  }
}
