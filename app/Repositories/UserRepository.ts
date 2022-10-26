import Model from 'App/Models/User'
import BaseRepository from './BaseRepository'

class UserRepository extends BaseRepository {
  constructor() {
    super(Model)
  }

  public async getTaskOfUser(id: number, page: number, perPage: number) {
    const user = await Model.find(id)

    return await user?.related('tasks').query().paginate(page, perPage)
  }
}

export default UserRepository
