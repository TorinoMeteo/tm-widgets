import parse from 'utils/parse'
import { execFunctionByName } from 'utils/functions'
import DefaultTMRealtimeWidget from 'widgets/default'
import ImageTMRealtimeWidget from 'widgets/image'

export default class TMWidgets {

  run () {
    parse('tmrealtime', this.initTMRealtime, this)
  }

  initTMRealtime (el) {
    let stationSlug = jQuery(el).attr('station')
    if (!stationSlug) {
      throw new Error('tmrealtime must define a station attribute')
    }
    this.fetchData(stationSlug, el, this.renderTMRealtime.bind(this))
  }

  fetchData (stationSlug, el, cb) {
    jQuery.getJSON('https://www.torinometeo.org/api/v1/realtime/data/' + stationSlug, (resp) => {
      cb(resp, el)
    })
  }

  renderTMRealtime (data, el) {
    // attributes
    let stationSlug = jQuery(el).attr('station')
    let type = jQuery(el).attr('type') || 'default'
    let refresh = parseInt(jQuery(el).attr('refresh') || 0)

    let widget
    if (type === 'default') {
      widget = new DefaultTMRealtimeWidget(el)
    } else if (type === 'image') {
      widget = new ImageTMRealtimeWidget(el)
    }

    jQuery(el).replaceWith(widget.render(data))

    // people better eat seconds
    if (refresh > 59) {
      setInterval(() => {
        this.fetchData(stationSlug, el, (data, el) => widget.render(data))
      }, refresh * 1000)
    }

    // callback
    let cb = jQuery(el).attr('onReady') || null
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
jQuery(document).ready(TMWidgetsInstance.run.bind(TMWidgetsInstance))
