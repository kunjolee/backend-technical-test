import { Router } from 'express'
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById
} from '../controllers/eventController'

const router = Router()

/**
 * @route GET /events
 * @description Retrieves all events
 */
router.get('/', getEvents)

/**
 * @route GET /events/:id
 * @description Retrieves an event by its ID
 */
router.get('/:id', getEventById)

/**
 * @route POST /events
 * @description Creates a new event
 */
router.post('/', createEvent)

/**
 * @route PUT /events/:id
 * @description Updates an existing event
 */
router.put('/:id', updateEvent)

/**
 * @route DELETE /events/:id
 * @description Deletes an event
 */
router.delete('/:id', deleteEvent)

export default router
