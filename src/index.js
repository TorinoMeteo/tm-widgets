import moment from 'moment'
import parse from 'utils/parse'
import { execFunctionByName } from 'utils/functions'

export default class TMWidgets {

  defaultLabels = {
    lastMeasure: 'ultima rilevazione',
    temperature: 'temperatura',
    rh: 'umidità relativa',
    pressure: 'pressione',
    wind: 'vento',
    rainRate: 'intensità precipitazioni',
    rain: 'accumulo precipitazioni'
  }

  run () {
    parse('tmrealtime', this.initTMRealtime, this)
  }

  initTMRealtime (el) {
    let stationSlug = $(el).attr('station')
    if (!stationSlug) {
      throw new Error('tmrealtime must define a station attribute')
    }
    this.fetchData(stationSlug, el)
  }

  fetchData (stationSlug, el) {
    $.getJSON('https://www.torinometeo.org/api/v1/realtime/data/' + stationSlug, (resp) => {
      this.renderTMRealtime(resp, el)
    })
  }

  label (el, l) {
    return $(el).attr(l + 'Label') || this.defaultLabels[l]
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

  renderTMRealtime (data, el) {
    // attributes
    let datetimeFormat = $(el).attr('datetimeFormat') || 'LLL'
    let stationSlug = $(el).attr('station')
    // classes
    let tempClass = data.temperature < 10 ? 'cold' : (data.temperature < 20 ? 'warm' : 'hot')
    // dom
    let wrapper = $('<section />', { 'class': 'tm-realtime-widget' })
    let tpl = `
    <section class="tm-realtime-wrapper">
      <header>
        <div style="background: #000">
          <a href="//www.torinometeo.org/realtime/${stationSlug}" target="_blank">
            <img src="https://www.torinometeo.org/static/core/src/img/logoTM.png"
                 style="max-width: 100%;"/>
          </a>
        </div>
        <h1>${data.station.name}</h1>
      </header>
      <div class="tm-realtime-last-measure">
        <span class="tm-realtime-label tm-realtime-label-last-measure">${this.label(el, 'lastMeasure')}</span>
        <time>${moment(data.datetime).locale('it').format(datetimeFormat)}</time>
      </div>
      <div class="tm-realtime-data">
        <div class="tm-realtime-temperature">
          <span class="tm-realtime-label tm-realtime-label-temperature">${this.label(el, 'temperature')}</span>
          <span class="tm-realtime-value tm-temp-${tempClass}">${data.temperature} °C</span>
        </div>
        <div class="tm-realtime-rh">
          <span class="tm-realtime-label tm-realtime-label-rh">${this.label(el, 'rh')}</span>
          <span class="tm-realtime-value">${data.relative_humidity} %</span>
        </div>
        <div class="tm-realtime-pressure">
          <span class="tm-realtime-label tm-realtime-label-pressure">${this.label(el, 'pressure')}</span>
          <span class="tm-realtime-value">${data.pressure} hPa</span>
        </div>
        <div class="tm-realtime-wind">
          <span class="tm-realtime-label tm-realtime-label-wind">${this.label(el, 'wind')}</span>
          <span class="tm-realtime-value">
            ${data.wind_strength} km/h
            <span class="${this.windDirClass(data.wind_dir)}">${data.wind_dir} deg</span>
          </span>
        </div>
        <div class="tm-realtime-rain-rate">
          <span class="tm-realtime-label tm-realtime-label-rain-rate">${this.label(el, 'rainRate')}</span>
          <span class="tm-realtime-value">${data.rain_rate} mm/h</span>
        </div>
        <div class="tm-realtime-rain">
          <span class="tm-realtime-label tm-realtime-label-rain">${this.label(el, 'rain')}</span>
          <span class="tm-realtime-value">${data.rain} mm</span>
        </div>
      </div>
    <section/>
    `

    $(el).replaceWith(wrapper.html(tpl))

    // callback
    let cb = $(el).attr('onReady') || null
    if (cb) {
      execFunctionByName(cb, window, wrapper)
    }
  }
}

// check requirements
if (typeof jQuery === 'undefined') {
  throw Error('tm-widgets requires jQuery >= 1.12.4. Make sure you load jQuery library before tm-widgets.')
}
// run on domready
let TMWidgetsInstance = new TMWidgets()
$(document).ready(TMWidgetsInstance.run.bind(TMWidgetsInstance))
