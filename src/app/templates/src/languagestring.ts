import { use } from "i18next";
import * as sprintf from "i18next-sprintf-postprocessor";

const languageStrings = {
  en: {
    translation: {
      SAY_HI: 'You can say hi to me',
      HELLO_WORLD: 'Hello World!',
      BYE: 'Goodbye!',
      SORRY: 'Sorry, I can\'t understand the command. Please say again.',
      LAUNCH: 'Welcome to the Alexa Skills Kit, you can say hello!'
    }
  },
  de: {
    translation: {
      SAY_HI: 'Du kannst mir hallo sagen',
      HELLO_WORLD: 'Hallo Welt!',
      BYE: 'Auf Wiedersehen!',
      SORRY: 'Es tut mir leid. Ich habe das leider nicht verstanden. Versuche es noch einmal.',
      LAUNCH: 'Willkommen zum Alexa Skills Kit. Du kannst hallo sagen!'
    }
  }
}

export const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    })
    const attributes = handlerInput.attributesManager.getRequestAttributes()
    attributes.t = (...args) => {
      return localizationClient.t.call(localizationClient, ...args)
    }
  }
}