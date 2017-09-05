import moment from 'moment'
import TMRealtimeWidget from './abstract'

export default class DefaultTMRealtimeWidget extends TMRealtimeWidget {

  render (data) {
    let el = this.el
    let datetimeFormat = jQuery(el).attr('datetimeFormat') || 'LLL'
    let stationSlug = jQuery(el).attr('station')
    // classes
    let tempClass = data.temperature < 10 ? 'cold' : (data.temperature < 20 ? 'warm' : 'hot')
    // dom
    let tpl = `
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
        <span class="tm-realtime-label tm-realtime-label-last-measure">${this.label('lastMeasure')}</span>
        <time>${moment(data.datetime).locale('it').format(datetimeFormat)}</time>
      </div>
      <div class="tm-realtime-data">
        <div class="tm-realtime-temperature">
          <span class="tm-realtime-label tm-realtime-label-temperature">${this.label('temperature')}</span>
          <span class="tm-realtime-value tm-temp-${tempClass}">${data.temperature} °C</span>
        </div>
        <div class="tm-realtime-rh">
          <span class="tm-realtime-label tm-realtime-label-rh">${this.label('rh')}</span>
          <span class="tm-realtime-value">${data.relative_humidity} %</span>
        </div>
        <div class="tm-realtime-pressure">
          <span class="tm-realtime-label tm-realtime-label-pressure">${this.label('pressure')}</span>
          <span class="tm-realtime-value">${data.pressure} hPa</span>
        </div>
        <div class="tm-realtime-wind">
          <span class="tm-realtime-label tm-realtime-label-wind">${this.label('wind')}</span>
          <span class="tm-realtime-value">
            ${data.wind_strength} km/h
            <span class="${this.windDirClass(data.wind_dir)}">${data.wind_dir} deg</span>
          </span>
        </div>
        <div class="tm-realtime-rain-rate">
          <span class="tm-realtime-label tm-realtime-label-rain-rate">${this.label('rainRate')}</span>
          <span class="tm-realtime-value">${data.rain_rate} mm/h</span>
        </div>
        <div class="tm-realtime-rain">
          <span class="tm-realtime-label tm-realtime-label-rain">${this.label('rain')}</span>
          <span class="tm-realtime-value">${data.rain} mm</span>
        </div>
      </div>
    `

    return this.wrapper.html(tpl)
  }
}
