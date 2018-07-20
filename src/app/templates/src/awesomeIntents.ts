export const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent'
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
    const speechText = requestAttributes.t('HELLO_WORLD')

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse()
  },
}
