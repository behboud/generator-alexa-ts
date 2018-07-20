import { SkillBuilders } from 'ask-sdk'
import {
  CancelAndStopIntentHandler,
  DefaultErrorHandler,
  HelpIntentHandler,
  SessionEndedRequestHandler,
  LaunchRequestHandler
} from './common'
import { LocalizationInterceptor } from './languagestring'
import { HelloWorldIntentHandler } from './awesomeIntents'

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    SessionEndedRequestHandler,
    CancelAndStopIntentHandler,
    HelpIntentHandler,
    SessionEndedRequestHandler,
    HelloWorldIntentHandler
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(DefaultErrorHandler)
  .lambda()
