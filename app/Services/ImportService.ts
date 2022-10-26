import BaseService from './BaseService'
import Excel from 'exceljs'
import * as fs from 'fs'
import csv from 'csvtojson'

class ImportService extends BaseService {
  constructor() {
    super()
  }

  public async ImportClassification(filelocation) {
    return csv({}).fromFile(filelocation)
  }
}

export default ImportService
