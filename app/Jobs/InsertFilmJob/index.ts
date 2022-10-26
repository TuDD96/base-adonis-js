import Film from 'App/Models/Film'
import ActorRepository from 'App/Repositories/ActorRepository'
import CategoryRepository from 'App/Repositories/CategoryRepository'
import CountryRepository from 'App/Repositories/CountryRepository'
import DirectorRepository from 'App/Repositories/DirectorRepository'
import EpisodeRepository from 'App/Repositories/EpisodeRepository'
import FilmRepository from 'App/Repositories/FilmRepository'
import StatusRepository from 'App/Repositories/StatusRepository'
import TypeRepository from 'App/Repositories/TypeRepository'
import Job from '../Job'
import { EpisodeType, MovieType } from './types'

class InsertFilmJob extends Job {
  protected queueName: string
  protected typeRepo: TypeRepository
  protected statusRepo: StatusRepository
  protected categoryRepo: CategoryRepository
  protected countryRepo: CountryRepository
  protected actorRepo: ActorRepository
  protected directorRepo: DirectorRepository
  protected filmRepo: FilmRepository
  protected episodeRepo: EpisodeRepository

  constructor(queueName: string) {
    super(queueName)
    this.queueName = queueName
    this.typeRepo = new TypeRepository()
    this.statusRepo = new StatusRepository()
    this.categoryRepo = new CategoryRepository()
    this.countryRepo = new CountryRepository()
    this.actorRepo = new ActorRepository()
    this.directorRepo = new DirectorRepository()
    this.filmRepo = new FilmRepository()
    this.episodeRepo = new EpisodeRepository()
  }

  public async action(queue: any) {
    const data = JSON.parse(queue!.content.toString())

    let types = await this.typeRepo
      .getAll()
      .then((res) => res.map((item) => ({ id: item.id, type: item.type })))
    let status = await this.statusRepo
      .getAll()
      .then((res) => res.map((item) => ({ id: item.id, status: item.status })))

    data.forEach(async (filmData: { movie: MovieType; episodes: EpisodeType[] }) => {
      const film: MovieType = filmData.movie
      const episodes: EpisodeType[] = filmData.episodes
      let cats: any = []
      let countries: any = []
      let actors: any = []
      let directors: any = []

      // categories
      if (filmData.movie.category) {
        filmData.movie.category.forEach((category) => {
          cats = [...cats, category.name.trim()]
        })
        cats = await this.categoryRepo
          .whereIn('name', cats, ['id'])
          .then((res) => res.map((item: { id: any }) => item.id))
      }

      // countries
      if (filmData.movie.country) {
        filmData.movie.country.forEach((country) => {
          countries = [...countries, country.name.trim()]
        })
        countries = await this.countryRepo
          .whereIn('name', countries, ['id'])
          .then((res) => res.map((item: { id: any }) => item.id))
      }

      // actors
      if (filmData.movie.actor) {
        filmData.movie.actor.forEach((actor) => {
          if (actor) actors = [...actors, actor.trim()]
        })

        actors = await this.actorRepo
          .whereIn('name', actors, ['id'])
          .then((res) => res.map((item: { id: any }) => item.id))
      }

      // Directors
      if (filmData.movie.director) {
        filmData.movie.director.forEach((director) => {
          if (director) directors = [...directors, director.trim()]
        })

        directors = await this.directorRepo
          .whereIn('name', directors, ['id'])
          .then((res) => res.map((item: { id: any }) => item.id))
      }

      let dataInsert = {
        name: film.name,
        origin_name: film.origin_name,
        content: film.content,
        type: this.getIdProperty(types, 'type', film.type),
        status: this.getIdProperty(status, 'status', film.status),
        thumb_url: film.thumb_url,
        poster_url: film.poster_url,
        is_copyright: film.is_copyright === 'off' ? 0 : 1,
        sub_docquyen: film.sub_docquyen === 'off' ? 0 : 1,
        movie_theaters: film.chieurap,
        trailer_url: film.trailer_url,
        time: film.time,
        episode_current: film.episode_current,
        episode_total: film.episode_total,
        quality: film.quality,
        lang: film.lang,
        notify: film.notify,
        showtimes: film.showtimes,
        slug: film.slug,
        year: film.year,
      }

      const f: Film = await this.filmRepo.updateOrCreate({ slug: film.slug }, dataInsert)
      const fId: number = f.toJSON().id
      const promises: any = []

      episodes.forEach((episode) => {
        const serverName = episode.server_name
        episode.server_data.forEach((server_data) => {
          const dataEpisodeInsert = {
            server_name: serverName,
            name: server_data.name,
            slug: server_data.slug,
            filename: server_data.filename,
            link_embed: server_data.link_embed,
            link_m3u8: server_data.link_m3u8,
          }
          promises.push(
            this.episodeRepo.updateOrCreate({ slug: film.slug, film_id: fId }, dataEpisodeInsert)
          )
        })
      })

      await Promise.all([
        ...promises,
        f.related('category').attach(cats),
        f.related('country').attach(countries),
        f.related('actor').attach(actors),
        f.related('director').attach(directors),
      ]).finally(() => {
        console.log(`${this.queueName} Success!`)
      })
    })
  }

  private getIdProperty(arr = [], key: string, val: string) {
    const item: any = arr.find((item) => item[key] === val)

    return item?.id ?? null
  }
}

export default InsertFilmJob
