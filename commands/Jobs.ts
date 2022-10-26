import { BaseCommand } from '@adonisjs/core/build/standalone'
import amqplib from 'amqplib'

export default class Jobs extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'jobs'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const queueName = 'my_queue'
    this.logger.info('Hello world!')
    const connection = await amqplib.connect('amqp://rabbitmq:rabbitmq@localhost:5672')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: true })
    console.log(`Waiting for messages in queue: ${queueName}`)
    await channel.consume(
      queueName,
      (msg) => {
        const secs = msg.content.toString().split('.').length - 1
        console.log('[X] Received:', msg.content.toString())
        setTimeout(() => {
          console.log('Done resizing image')
          channel.ack(msg)
        }, secs * 1000)
      },
      { noAck: false }
    )
    setInterval(() => {
      console.log('running')
    }, 1000)
  }
}
