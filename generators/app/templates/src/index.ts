import { handler as alexaHandle } from 'alexa-sdk'
import AMAZON from './common'
import languageStrings from './languagestring'
import LaunchRequest from './launch'
import Unhandled from './unhandled'
import SessionEndedRequest from './sessionended'
import * as awesomeIntents from './awesomeIntents'

const handlers = {
  LaunchRequest,
  Unhandled,
  SessionEndedRequest,
  ...AMAZON,
  ...awesomeIntents
}

export const handler = (event: any, context: any, callback: any) => {
  const alexa = alexaHandle(event, context, callback)
  alexa.appId = '<%= skillid %>'
  alexa.resources = languageStrings
  alexa.registerHandlers(handlers)
  alexa.execute()
}
