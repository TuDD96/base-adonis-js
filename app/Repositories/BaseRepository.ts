class BaseRepository {
  private _model

  constructor(model) {
    this._model = model
  }

  public async getAll() {
    return await this._model.all()
  }

  public async first() {
    return await this._model.first()
  }

  public async find(id: number) {
    return await this._model.find(id)
  }

  public async findBy(key: string, value: string | number) {
    return await this._model.findBy(key, value)
  }

  public async store(data: any) {
    return await this._model.create(data)
  }

  public async update(data: any, id: number) {
    return await this._model.query().where('id', id).update(data)
  }

  public async delete(id: number) {
    try {
      const item = await this._model.findOrFail(id)

      return await item.delete()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async updateOrCreate(key: any, savePayload: any) {
    return await this._model.updateOrCreate(key, savePayload)
  }

  public async updateOrCreateMany(keyForSearch: string, payload: any) {
    return await this._model.updateOrCreateMany(keyForSearch, payload)
  }

  public async whereIn(key: any, value: any, select?: string[]) {
    if (select) {
      return await this._model.query().whereIn(key, value).select(select.join())
    }
    return await this._model.query().whereIn(key, value)
  }
}

export default BaseRepository
