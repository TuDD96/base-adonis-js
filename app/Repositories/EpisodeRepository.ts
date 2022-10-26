import Model from 'App/Models/Episode'
import BaseRepository from './BaseRepository'

class EpisodeRepository extends BaseRepository {
  constructor() {
    super(Model)
  }
}

export default EpisodeRepository
