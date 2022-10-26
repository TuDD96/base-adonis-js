import Constants from 'App/Enums/Constants'
import Task from 'App/Models/Task'
import UserRepository from 'App/Repositories/UserRepository'
import TaskRepository from '../Repositories/TaskRepository'
import BaseService from './BaseService'

class TaskService extends BaseService {
  protected taskRepository: TaskRepository
  protected userRepository: UserRepository

  constructor() {
    super()
    this.taskRepository = new TaskRepository()
    this.userRepository = new UserRepository()
  }

  public async getAllTask(dataRequest, user_id: number) {
    const perPage = dataRequest.per_page ?? Constants.PER_PAGE_DEFAULT
    const page = dataRequest.page ?? Constants.PAGE_DEFAULT

    return await this.userRepository.getTaskOfUser(user_id, page, perPage)
  }

  public async storeTask(data: Task) {
    return await this.taskRepository.store(data)
  }

  public async showTask(id: number) {
    return await this.taskRepository.find(id)
  }

  public async updateTask(data: Task, id: number) {
    try {
      await this.taskRepository.find(id)

      return await this.taskRepository.update(data, id)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async deleteTask(id: number) {
    try {
      return await this.taskRepository.delete(id)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default TaskService
