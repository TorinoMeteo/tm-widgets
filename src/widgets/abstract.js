/**
 * Parent Widget Realtime Class
 *
 * every widget specifi class inherits from this one
 */
export default class TMRealtimeWidget {

  defaultLabels = {
    lastMeasure: 'ultima rilevazione',
    temperature: 'temperatura',
    rh: 'umidità relativa',
    pressure: 'pressione',
    wind: 'vento',
    rainRate: 'intensità precipitazioni',
    rain: 'accumulo precipitazioni'
  }

  constructor (el) {
    this.el = el
    this.wrapper = jQuery('<section />', { 'class': 'tm-realtime-widget' })
  }

  label (l) {
    return jQuery(this.el).attr(l + 'Label') || this.defaultLabels[l]
  }

  windDirClass (dir) {
    if (dir > 337) {
      return 'direction-up'
    } else if (dir > 293) {
      return 'direction-up-left'
    } else if (dir > 248) {
      return 'direction-left'
    } else if (dir > 202) {
      return 'direction-down-left'
    } else if (dir > 158) {
      return 'direction-down'
    } else if (dir > 113) {
      return 'direction-down-right'
    } else if (dir > 68) {
      return 'direction-right'
    } else if (dir > 23) {
      return 'direction-up-right'
    } else {
      return 'direction-up'
    }
  }
}
