import Model from 'App/Models/StatusFilm'
import BaseRepository from './BaseRepository'

class StatusRepository extends BaseRepository {
  constructor() {
    super(Model)
  }
}

export default StatusRepository
