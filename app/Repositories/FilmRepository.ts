import Model from 'App/Models/Film'
import BaseRepository from './BaseRepository'

class FilmRepository extends BaseRepository {
  constructor() {
    super(Model)
  }

  public async createFilmCate(id: number, cats: []) {
    const film = await Model.find(1)
  }
}

export default FilmRepository
