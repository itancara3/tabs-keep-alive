export default {
  printMessageOnClose: (Route) => {
    console.log('FROM EVENT ON CLOSE', Route)
  },
  secondFunctionOnClose: (Route) => {
    console.log('FROM SECOND EVENT ON CLOSE', Route)
  }
}
