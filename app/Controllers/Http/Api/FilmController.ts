// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BaseController from '../BaseController'
import FilmService from 'App/Services/FilmService/FilmService'

class FilmController extends BaseController {
  protected filmService: FilmService

  constructor() {
    super()
    this.filmService = new FilmService()
  }

  public async insertFilm({ params }) {
    const page = parseInt(params?.page ?? 1)

    return this.filmService.insertFilm(page)
  }
}

export default FilmController
