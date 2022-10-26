import Model from 'App/Models/TypeFilm'
import BaseRepository from './BaseRepository'

class TypeRepository extends BaseRepository {
  constructor() {
    super(Model)
  }
}

export default TypeRepository
