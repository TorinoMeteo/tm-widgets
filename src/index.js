import $ from 'jquery'
import parse from 'utils/parse'

export default class TMWidgets {

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

  renderTMRealtime (data, el) {
    console.log('rendering', data)
    let wrapper = $('<div />').html(data.station.name)
    $(el).replaceWith(wrapper)
  }
}

// run on domready
let TMWidgetsInstance = new TMWidgets()
$(document).ready(TMWidgetsInstance.run.bind(TMWidgetsInstance))
