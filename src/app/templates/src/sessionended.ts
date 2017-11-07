export default function SessionEndedRequest() {
  console.log('session ended!')
  this.emit(':tell', 'closing session')
  //this.emit(':saveState', true) // Be sure to call :saveState to persist your session attributes in DynamoDB
}
