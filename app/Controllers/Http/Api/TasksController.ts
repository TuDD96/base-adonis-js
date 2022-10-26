// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BaseController from '../BaseController'
import TaskService from 'App/Services/TaskService'
import Mail from '@ioc:Adonis/Addons/Mail'
import ErrorType from 'App/Enums/ErrorType'
import GetTaskValidator from 'App/Validators/Task/GetTaskValidator'
import CreateTaskValidator from 'App/Validators/Task/CreateTaskValidator'
import Ws from 'App/Services/Ws'

class TasksController extends BaseController {
  protected taskService: TaskService

  constructor() {
    super()
    this.taskService = new TaskService()
  }

  public async index({ request, response, auth }) {
    try {
      console.log(111)

      Ws.io.emit('news', { username: 'virk' })
      const dataRequest = await request.validate(GetTaskValidator)

      const data = await this.taskService.getAllTask(dataRequest, auth.user.id)

      return this.sendSuccess(response, data, 'success')
    } catch (error) {
      return this.sendError(
        response,
        error?.messages?.errors ?? error?.message,
        ErrorType.CODE_4041,
        ErrorType.STATUS_4041
      )
    }
  }

  public async store({ request, response, auth }) {
    try {
      const data = await request.validate(CreateTaskValidator)

      data.user_id = auth.user.id

      const stored = await this.taskService.storeTask(data)

      return this.sendSuccess(response, stored, 'success')
    } catch (error) {
      return this.sendError(
        response,
        error?.messages?.errors ?? error?.message,
        ErrorType.CODE_4041,
        ErrorType.STATUS_4041
      )
    }
  }

  public async show({ response, params }) {
    try {
      const id = params.id
      if (!id) return this.sendError(response, 'task is not found')

      const task = await this.taskService.showTask(id)

      return this.sendSuccess(response, task, 'success')
    } catch (error) {
      return this.sendError(response, error?.message, ErrorType.CODE_4041, ErrorType.STATUS_4041)
    }
  }

  public async update({ request, response, params }) {
    try {
      const id = params.id
      if (!id) return this.sendError(response, 'task is not found')
      const data = await request.validate(CreateTaskValidator)

      const task = await this.taskService.updateTask(data, id)

      return this.sendSuccess(response, task, 'success')
    } catch (error) {
      console.log(error)

      return this.sendError(
        response,
        error?.messages?.errors ?? error?.message,
        ErrorType.CODE_4041,
        ErrorType.STATUS_4041
      )
    }
  }

  public async delete({ response, params }) {
    try {
      const id = params.id
      if (!id) return this.sendError(response, 'task is not found')
      const task = await this.taskService.deleteTask(id)

      return this.sendSuccess(response, task, 'success')
    } catch (error) {
      return this.sendError(
        response,
        error?.messages?.errors ?? error?.message,
        ErrorType.CODE_4041,
        ErrorType.STATUS_4041
      )
    }
  }

  public async sendMail() {
    return await Mail.send((message) => {
      message
        .from('info@example.com')
        .to('virk@adonisjs.com')
        .subject('Welcome Onboard!')
        .htmlView('emails/welcome', { name: 'Virk' })
    })
  }

  public async testQueue() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface IJobData {
      name: string
      age: number
    }

    const users = [
      { name: 'John', age: 31 },
      { name: 'Jane', age: 25 },
      { name: 'Jim', age: 19 },
      { name: 'Jill', age: 17 },
      { name: 'Jack', age: 32 },
    ]

    // const queue = new Queue<IJobData>('myQueue')

    // const promises = users.map((user) => queue.add(user))

    // return await Promise.all(promises)
  }
}

export default TasksController
