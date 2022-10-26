import Model from 'App/Models/Actor'
import BaseRepository from './BaseRepository'

class ActorRepository extends BaseRepository {
  constructor() {
    super(Model)
  }

  public test(): void {
    console.log('develop an app')
  }
}

export default ActorRepository
