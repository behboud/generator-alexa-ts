export function RedirectToThisIntent() {
  switch (this.event.request.dialogState) {
    case 'STARTED':
      console.log('dialog just started')
      this.emit(':delegate')
      break
    case 'COMPLETED':
      console.log('dialog completed')
      this.emit('Unhandled')
      break
    default:
      console.log('need more')
      this.emit(':delegate')
      break
  }
}
