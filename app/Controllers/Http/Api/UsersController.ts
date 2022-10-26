// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserService from 'App/Services/UserService'
import BaseController from '../BaseController'

class UsersController extends BaseController {
  protected userService: UserService

  constructor() {
    super()
    this.userService = new UserService()
  }

  public async index() {
    return false
  }
}

export default UsersController
