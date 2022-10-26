import Rabbit from '@ioc:Adonis/Addons/Rabbit'

class Job {
  protected queueName: string

  constructor(queueName: string) {
    this.queueName = queueName
  }

  public async dispatch(data: any) {
    return await Rabbit.sendToQueue(this.queueName, data)
  }

  public async handle() {
    await Rabbit.assertQueue(this.queueName, { durable: true })
    await Rabbit.consumeFrom(this.queueName, async (queue) => {
      await this.action(queue)
      queue.ack()
    })
  }

  public async action(queue: any) {}
}

export default Job
