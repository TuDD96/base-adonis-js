/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ErrorType from 'App/Enums/ErrorType'
import { ErrorResponse } from './types'

export default class ExceptionHandler extends HttpExceptionHandler {
  private errResponse: ErrorResponse
  private statusCode: number

  constructor() {
    super(Logger)
    this.errResponse = {
      error: {
        code: '',
        message: '',
      },
    }
    this.statusCode = ErrorType.STATUS_4041
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error) {
      switch (error.code) {
        case 'E_VALIDATION_FAILURE':
          this.errResponse.error.code = ErrorType.CODE_4220
          this.errResponse.error.errors = error?.messages?.errors
          this.errResponse.error.message = error?.message
          this.statusCode = ErrorType.STATUS_4220
          break

        case 'E_UNAUTHORIZED_ACCESS':
          this.errResponse.error.code = ErrorType.CODE_4030
          this.errResponse.error.message = error?.messages ?? error?.message
          this.statusCode = ErrorType.STATUS_4030
          break

        default:
          this.errResponse.error.code = ErrorType.CODE_4041
          this.errResponse.error.message = error?.messages ?? error?.message
          break
      }

      return ctx.response.status(this.statusCode).send(this.errResponse)
    }

    return super.handle(error, ctx)
  }
}
