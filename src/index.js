import parse from 'utils/parse'
import { execFunctionByName } from 'utils/functions'
import DefaultTMRealtimeWidget from 'widgets/default'

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
    // attributes
    let type = $(el).attr('type')

    let widget
    if (type === 'default') {
      widget = new DefaultTMRealtimeWidget()
    }

    $(el).replaceWith(widget.render(el, data))

    // callback
    let cb = $(el).attr('onReady') || null
    if (cb) {
      execFunctionByName(cb, window, widget)
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
