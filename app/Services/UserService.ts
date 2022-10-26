import User from 'App/Models/Task'
import UserRepository from '../Repositories/UserRepository'
import BaseService from './BaseService'

class UserService extends BaseService {
  protected userRepository: UserRepository

  constructor() {
    super()
    this.userRepository = new UserRepository()
  }

  public async getAllTask() {
    return await this.userRepository.getAll()
  }

  public async storeUser(data: User) {
    return await this.userRepository.store(data)
  }
}

export default UserService
