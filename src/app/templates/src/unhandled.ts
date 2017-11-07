// UPDATEME: Does your skill use Dialog Directives?  If so, update this to true.
const DIALOG_DIRECTIVE_SUPPORT = true

export default function Unhandled() {
  const request = this.event.request
  console.log(JSON.stringify(request))

  const intentInfo = parseIntentsAndSlotsFromEvent(request, this)

  // If dialog directive support is enabled AND it exists and it is not in "completed" status, delegate back to the interaction model
  if (
    DIALOG_DIRECTIVE_SUPPORT &&
    request.dialogState &&
    request.dialogState !== 'COMPLETED'
  ) {
    this.emit(':delegate')
  } else {
    this.attributes['intentOutput'] = intentInfo.cardInfo

    // Determine if we are going to end the session or keep it in dialog mode.  When used in dialog mode we "ask"
    // as we are expecting another question to come through.  When used in OneShot mode we "tell" and end the session.
    if (this.attributes['dialogSession']) {
      this.emit(
        ':askWithCard',
        intentInfo.response,
        this.t('still_listening'),
        this.t('card_title'),
        intentInfo.cardInfo
      )
    } else {
      this.emit(
        ':tellWithCard',
        intentInfo.response,
        this.t('card_title'),
        intentInfo.cardInfo
      )
    }
  }
}

/**
 * Parses the collected event info from Alexa into a friendlier TTS response and 
 * creates a card response with Intent/Slot info
 */
function parseIntentsAndSlotsFromEvent(request, intentObject) {
  //Cleanse the request intent name
  let intentName = request.intent.name.replace(/[^a-zA-Z0-9]/g, ' ')

  let numSlots = 0
  let slots = request.intent.slots

  let filledInSlots = {}

  if (slots) {
    for (let i in slots) {
      //Check if there is a value in a given slot
      if (slots[i].value) {
        filledInSlots[slots[i].name] = slots[i].value
        numSlots++
      }
    }
  }

  let responseText = `${intentName} ${intentObject.t(
    'received_with'
  )} ${numSlots} ${intentObject.t('slots')}`
  let cardInfo = `${intentName} ${intentObject.t(
    'received_with'
  )} ${numSlots} ${intentObject.t('slots')}`

  if (filledInSlots > 0) {
    responseText += intentObject.t('received_slots_are')
  }

  for (let slotName in filledInSlots) {
    responseText += ` ${slotName}, ${filledInSlots[slotName]}. `
    cardInfo += `\n${slotName}: ${filledInSlots[slotName]}`
  }

  return {
    response: responseText,
    cardInfo: cardInfo
  }
}
