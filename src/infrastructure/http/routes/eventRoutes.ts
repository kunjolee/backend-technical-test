import { Router } from 'express'
import { EventController } from '../controllers/eventController'
import { validateDTO } from '../middlewares/validateDTO'
import { CreateEventDTO } from '../../../application/dtos/createEventDTO'

const router = Router()
const eventController = new EventController()

/**
 * @route GET /events
 * @description Retrieves all events
 */
router.get('/', (req, res) => eventController.getAllEvents(req, res))

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
 * @route PUT /events/:id
 * @description Updates an existing event
 */
router.put('/:id', (req, res) => eventController.updateEvent(req, res))

/**
 * @route DELETE /events/:id
 * @description Deletes an event
 */
router.delete('/:id', (req, res) => eventController.deleteEvent(req, res))

export default router
