// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BaseController from '../BaseController'
import Application from '@ioc:Adonis/Core/Application'
import ImportService from 'App/Services/ImportService'
import csv from 'csvtojson'
import Drive from '@ioc:Adonis/Core/Drive'
import Rabbit from '@ioc:Adonis/Addons/Rabbit'

class ImportController extends BaseController {
  protected importService: ImportService

  constructor() {
    super()
    this.importService = new ImportService()
  }

  public async import2({ request, response }) {
    let upload = request.file('upload')
    let fname = `${new Date().getTime()}.${upload.extname}`
    let dir = 'upload/'

    //move uploaded file into custom folder
    await upload.move(Application.tmpPath(dir), {
      name: fname,
    })

    const res = await csv({}).fromFile('tmp/' + dir + fname)

    await upload.remove()

    return res
  }

  public async import3({ request, response }) {
    let upload = request.file('upload')
    try {
      await upload.moveToDisk('./', {}, 's3')

      return 'success'
    } catch (error) {
      console.log(error)
      return 'error'
    }
  }

  public async import4() {
    const s3 = Drive.use('s3')
    const contents = await s3.getUrl('1670487898344.png')
    console.log(contents)
  }

  public async import() {
    try {
      // // Ensures the queue exists
      // const queue = await Rabbit.assertQueue('my_queue', { durable: true })

      // console.log(queue)

      // Sends a message to the queue
      const queue2 = await Rabbit.sendToQueue('my_queue', { name: 'userName' })

      console.log(queue2)
    } catch (error) {
      console.log(error)
    }
  }
  public async queueJob() {
    try {
      // Ensures the queue exists
      const queue = await Rabbit.assertQueue('my_queue', { durable: true })

      console.log(queue)

      // Sends a message to the queue
      // const queue2 = await Rabbit.sendToQueue('my_queue', 'This message was sent by adonis-rabbit')

      // console.log(queue2)
    } catch (error) {
      console.log(error)
    }
  }
}

export default ImportController
