import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Film from './Film'

export default class Episode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public filmId: number

  @column()
  public serverName: string

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public filename: string

  @column()
  public linkEmbed: string

  @column()
  public linkM3u8: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Film)
  public film: BelongsTo<typeof Film>
}
