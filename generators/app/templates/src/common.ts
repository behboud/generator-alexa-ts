function CancelIntent() {
  this.emit(':tell', this.t('exit'))
}
function StopIntent() {
  this.emit(':tell', this.t('exit'))
}

function HelpIntent() {
  this.emit(':tell', `Hello. Help is near.`)
}

export default {
  'AMAZON.CancelIntent': CancelIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.HelpIntent': HelpIntent
}
