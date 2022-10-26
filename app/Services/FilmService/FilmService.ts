import BaseService from '../BaseService'
import csv from 'csvtojson'
import axios from 'axios'
import ActorRepository from 'App/Repositories/ActorRepository'
import DirectorRepository from 'App/Repositories/DirectorRepository'
import CategoryRepository from 'App/Repositories/CategoryRepository'
import CountryRepository from 'App/Repositories/CountryRepository'
import TypeRepository from 'App/Repositories/TypeRepository'
import StatusRepository from 'App/Repositories/StatusRepository'
import InsertFilmJob from 'App/Jobs/InsertFilmJob'

class FilmService extends BaseService {
  protected actorRepository: ActorRepository
  protected directorRepository: DirectorRepository
  protected categoryRepository: CategoryRepository
  protected countryRepository: CountryRepository
  protected typeRepository: TypeRepository
  protected statusRepository: StatusRepository

  constructor() {
    super()
    this.actorRepository = new ActorRepository()
    this.directorRepository = new DirectorRepository()
    this.categoryRepository = new CategoryRepository()
    this.countryRepository = new CountryRepository()
    this.typeRepository = new TypeRepository()
    this.statusRepository = new StatusRepository()
  }

  public async ImportClassification(filelocation) {
    return csv({}).fromFile(filelocation)
  }

  public async insertFilm(page: number) {
    const url = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`

    try {
      const response = await axios.get(url)

      let arrActor: string[] = []
      let arrDirector: string[] = []
      let arrCategory: string[] = []
      let arrCountry: string[] = []
      let arrType: string[] = []
      let arrStatus: string[] = []
      let arrFilm: any = []
      const promises: any = []

      response.data.items.forEach((film) => {
        const filmUrl = `https://ophim1.com/phim/${film.slug}`
        promises.push(axios.get(filmUrl))
      })

      const filmItemData = await Promise.all(promises)

      filmItemData.forEach((filmItem) => {
        if (filmItem?.data.movie.actor) {
          arrActor = [...arrActor, ...filmItem?.data.movie.actor]
        }
        if (filmItem?.data.movie.director) {
          arrDirector = [...arrDirector, ...filmItem?.data.movie.director]
        }
        if (filmItem?.data.movie.category) {
          let cate: string[] = []
          filmItem?.data.movie.category.forEach((category) => {
            cate = [...cate, category.name]
          })
          arrCategory = [...arrCategory, ...cate]
        }
        if (filmItem?.data.movie.country) {
          let countries: string[] = []
          filmItem?.data.movie.country.forEach((country) => {
            countries = [...countries, country.name]
          })
          arrCountry = [...arrCountry, ...countries]
        }
        if (filmItem?.data.movie.type) {
          arrType = [...arrType, filmItem?.data.movie.type]
        }
        if (filmItem?.data.movie.status) {
          arrStatus = [...arrStatus, filmItem?.data.movie.status]
        }

        arrFilm = [
          ...arrFilm,
          {
            movie: filmItem?.data.movie,
            episodes: filmItem?.data?.episodes,
          },
        ]
      })
      arrActor = [...new Set(arrActor.filter((actor) => actor !== '').map((actor) => actor.trim()))]
      arrDirector = [
        ...new Set(
          arrDirector.filter((director) => director !== '').map((director) => director.trim())
        ),
      ]
      arrCategory = [
        ...new Set(arrCategory.filter((cate) => cate !== '').map((cate) => cate.trim())),
      ]
      arrCountry = [
        ...new Set(arrCountry.filter((country) => country !== '').map((country) => country.trim())),
      ]
      arrType = [...new Set(arrType)]
      arrStatus = [...new Set(arrStatus)]

      // insert actors
      await this.actorRepository.updateOrCreateMany(
        'name',
        arrActor.map((item) => ({ name: item }))
      )
      await this.directorRepository.updateOrCreateMany(
        'name',
        arrDirector.map((item) => ({ name: item }))
      )
      await this.categoryRepository.updateOrCreateMany(
        'name',
        arrCategory.map((item) => ({ name: item }))
      )
      await this.countryRepository.updateOrCreateMany(
        'name',
        arrCountry.map((item) => ({ name: item }))
      )
      await this.typeRepository.updateOrCreateMany(
        'type',
        arrType.map((item) => ({ type: item, title: item }))
      )
      await this.statusRepository.updateOrCreateMany(
        'status',
        arrStatus.map((item) => ({ status: item, title: item }))
      )

      await new InsertFilmJob('insertFilm').dispatch(arrFilm)

      return 'success'
    } catch (error) {
      console.log(error)

      return 'false'
    }
  }
}

export default FilmService
