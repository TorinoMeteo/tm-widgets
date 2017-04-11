import $ from 'jquery'
import parse from 'utils/parse'

export default class TMWidgets {

  constructor () {
    this.renderTMRealtime = this.renderTMRealtime.bind(this)
  }

  run () {
    parse('tmrealtime', this.renderTMRealtime, this)
  }

  renderTMRealtime (el) {
    let stationSlug = $(el).attr('station')
    if (!stationSlug) {
      throw new Error('tmrealtime must define a station attribute')
    }
  }
}

// run on domready
let TMWidgetsInstance = new TMWidgets()
$(document).ready(TMWidgetsInstance.run.bind(TMWidgetsInstance))
