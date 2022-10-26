import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'films'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('_id')
      table.string('name')
      table.string('origin_name')
      table.text('content')
      table.integer('type')
      table.integer('status')
      table.string('thumb_url')
      table.string('poster_url')
      table.integer('is_copyright')
      table.integer('sub_docquyen')
      table.boolean('movie_theaters')
      table.string('trailer_url')
      table.string('time')
      table.string('episode_current')
      table.string('episode_total')
      table.string('quality')
      table.string('lang')
      table.string('notify')
      table.string('showtimes')
      table.string('slug')
      table.integer('year')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
