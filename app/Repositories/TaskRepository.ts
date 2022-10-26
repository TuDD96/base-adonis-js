import Model from 'App/Models/Task'
import BaseRepository from './BaseRepository'

class TaskRepository extends BaseRepository {
  constructor() {
    super(Model)
  }
}

export default TaskRepository
