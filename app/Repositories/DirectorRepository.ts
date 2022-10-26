import Model from 'App/Models/Director'
import BaseRepository from './BaseRepository'

class DirectorRepository extends BaseRepository {
  constructor() {
    super(Model)
  }
}

export default DirectorRepository
