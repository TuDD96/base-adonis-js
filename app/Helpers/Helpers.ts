class Helpers {
  public static logMsg = (msg: string) => {
    return {
      timestamp: new Date().getTime(),
      msg,
    }
  }
}

export default Helpers
