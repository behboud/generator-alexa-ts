export default function LaunchRequest() {
  this.attributes['dialogSession'] = true
  this.emit(':ask', this.t('launchRequestResponse'))
}
