import ErrorType from '../../Enums/ErrorType'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import Logger from 'App/Helpers/Logger'

class BaseController {
  protected printLog: Logger

  constructor() {
    this.printLog = new Logger()
  }

  public async sendSuccess(response: ResponseContract, data: any, message: string) {
    return response.send({
      data: data,
      message: message,
    })
  }

  public async sendError(
    response: ResponseContract,
    message: string,
    code?: string,
    statusCode?: number
  ) {
    if (!code) code = ErrorType.CODE_5000
    if (!statusCode) statusCode = ErrorType.STATUS_5000

    return response.status(statusCode).send({
      error: {
        code: code,
        message: message,
      },
    })
  }
}

export default BaseController
