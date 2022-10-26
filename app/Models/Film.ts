import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Actor from './Actor'
import Director from './Director'
import Country from './Country'
import Episode from './Episode'

export default class Film extends BaseModel {
  public static castDates(value) {
    return value.toISOString()
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public originName: string

  @column()
  public content: string

  @column()
  public type: number

  @column()
  public status: number

  @column()
  public thumbUrl: string

  @column()
  public posterUrl: string

  @column()
  public isCopyright: number

  @column()
  public subDocquyen: number

  @column()
  public movieTheaters: boolean

  @column()
  public trailerUrl: string

  @column()
  public time: string

  @column()
  public episodeCurrent: string

  @column()
  public episodeTotal: string

  @column()
  public quality: string

  @column()
  public lang: string

  @column()
  public notify: string

  @column()
  public showtimes: string

  @column()
  public slug: string

  @column()
  public year: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships
  @manyToMany(() => Category, {
    pivotTable: 'film_category',
    localKey: 'id',
    pivotForeignKey: 'film_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'category_id',
    pivotTimestamps: true,
  })
  public category: ManyToMany<typeof Category>

  @manyToMany(() => Actor, {
    pivotTable: 'film_actor',
    pivotTimestamps: true,
  })
  public actor: ManyToMany<typeof Actor>

  @manyToMany(() => Director, {
    pivotTable: 'film_director',
    pivotTimestamps: true,
  })
  public director: ManyToMany<typeof Director>

  @manyToMany(() => Country, {
    pivotTable: 'film_country',
    pivotTimestamps: true,
  })
  public country: ManyToMany<typeof Country>

  @hasMany(() => Episode)
  public episodes: HasMany<typeof Episode>
}
