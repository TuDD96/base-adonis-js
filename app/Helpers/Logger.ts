import * as fs from 'fs'
import moment from 'moment'
import ip from 'ip'

class Logger {
  private d = moment().format('YYYY-MM-DD')
  private datetime = moment().format('YYYY-MM-DD hh:mm:ss')
  private path = `${__dirname}/../../storage/logs/${this.d}.log`

  public async log(msg: any) {
    if (typeof msg !== 'string') msg = JSON.stringify(msg)
    if (!msg || msg.trim().length === 0) return false

    msg = `\r\n${this.datetime} ${msg.trim() ?? ''} from ${ip.address()}`

    fs.appendFile(this.path, msg, function (err) {
      if (err) {
        console.log(err.message)
      }
    })
  }
}

export default Logger
