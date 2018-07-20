export const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
    const speechText = requestAttributes.t('LAUNCH')

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(requestAttributes.t('HELLO_WORLD'), speechText)
      .getResponse()
  },
}

export const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
    const speechText = requestAttributes.t('SAY_HI')

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(requestAttributes.t('HELLO_WORLD'), speechText)
      .getResponse()
  },
}

export const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
    const speechText = requestAttributes.t('BYE')

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(requestAttributes.t('HELLO_WORLD'), speechText)
      .getResponse()
  },
}

export const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`)

    return handlerInput.responseBuilder.getResponse()
  },
}

export const DefaultErrorHandler = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
    console.log(`Error:${error.stack} ${error.message} `)
    const speechText = requestAttributes.t('SORRY')

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  },
}
