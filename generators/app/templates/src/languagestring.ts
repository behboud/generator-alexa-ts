// Series of strings for language tokenization
export default {
  'en-US': {
    translation: {
      launchRequestResponse:
        'Launch Request for dialog mode, the session will remain open until you say, stop',
      exit: 'Goodbye.',
      received_with: ' received with ',
      slot: ' slot. ',
      slots: ' slots. ',
      still_listening:
        "I'm still listening,  Please try another intent or say, stop",
      received_slots_are: 'Received slots are ',
      card_title: 'Reflected Intent'
    }
  },
  'de-DE': {
    translation: {
      launchRequestResponse:
        'Launch Request. Gib den nächsten Befehl oder sage Abbruch',
      exit: 'Auf Wiedersehen.',
      received_with: ' empfangen mit ',
      slot: ' Slot. ',
      slots: ' Slots. ',
      still_listening:
        'Ich lausche noch immer. Bitte gebe einen neuen Befehl oder sage Stop.',
      received_slots_are: 'Empfangene Slots sind ',
      card_title: 'Reflektierte Absicht'
    }
  }
}
