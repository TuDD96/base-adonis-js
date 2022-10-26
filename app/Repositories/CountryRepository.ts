import Model from 'App/Models/Country'
import BaseRepository from './BaseRepository'

class CountryRepository extends BaseRepository {
  constructor() {
    super(Model)
  }
}

export default CountryRepository
