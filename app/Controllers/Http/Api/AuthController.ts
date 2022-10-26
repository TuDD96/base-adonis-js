import UserService from 'App/Services/UserService'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'
import BaseController from '../BaseController'

class AuthController extends BaseController {
  protected userService: UserService

  constructor() {
    super()
    this.userService = new UserService()
  }

  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await auth.attempt(email, password)

    return this.sendSuccess(response, user, 'success')
  }

  public async register({ request, response }) {
    const data = await request.validate(CreateUserValidator)
    const user = await this.userService.storeUser(data)

    return this.sendSuccess(response, user, 'success')
  }
}

export default AuthController
