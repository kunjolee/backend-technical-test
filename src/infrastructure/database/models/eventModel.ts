import { DataTypes, Model } from 'sequelize'
import sequelize from '../connection'

/**
 * Class representing an Event model.
 * @extends Model
 */
class EventModel extends Model {
  public id!: number
  public name!: string
  public description!: string
  public date!: Date
  public location!: string
  public organizer!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

/**
 * Initialize the Event model with its attributes and options.
 */
EventModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'Unique identifier for the event'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the event'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Description of the event'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: 'Date of the event'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Location of the event'
    },
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Organizer of the event'
    }
  },
  {
    sequelize,
    modelName: 'event',
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
    tableName: 'Event',
    comment: 'Table to store event details'
  }
)

export default EventModel
