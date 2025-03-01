import { Router } from 'express'
import { EventController } from '../controllers/eventController'
import { validateDTO } from '../middlewares/validateDTO'
import { validateQueryParams } from '../middlewares/validateQueryParams'
import { CreateEventDTO } from '../../../application/dtos/createEventDTO'
import { UpdateEventDTO } from '../../../application/dtos/updateEventDTO'
import { GetAllEventsDTO } from '../../../application/dtos/getAllEventsDTO'

const router = Router()
const eventController = new EventController()

/**
 * @route GET /events
 * @description Retrieves all events
 */
router.get('/', validateQueryParams(GetAllEventsDTO), (req, res) =>
  eventController.getAllEvents(req, res)
)

/**
 * @route GET /events/:id
 * @description Retrieves an event by its ID
 */
router.get('/:id', (req, res) => eventController.getEventById(req, res))

/**
 * @route POST /events
 * @description Creates a new event
 */
router.post('/', validateDTO(CreateEventDTO), (req, res) =>
  eventController.createEvent(req, res)
)

/**
 * @route PATCH /events/:id
 * @description Updates an existing event
 */
router.patch('/:id', validateDTO(UpdateEventDTO), (req, res) =>
  eventController.updateEvent(req, res)
)

/**
 * @route DELETE /events/:id
 * @description Deletes an event
 */
router.delete('/:id', (req, res) => eventController.deleteEvent(req, res))

export default router
