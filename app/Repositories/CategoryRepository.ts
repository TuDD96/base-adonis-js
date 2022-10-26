import Model from 'App/Models/Category'
import BaseRepository from './BaseRepository'

class CategoryRepository extends BaseRepository {
  constructor() {
    super(Model)
  }
}

export default CategoryRepository
