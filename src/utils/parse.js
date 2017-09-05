export default function parse (tag, cb, bind) {
  let elems = jQuery(tag)
  if (elems.length) {
    for (var i = 0, len = elems.length; i < len; i++) {
      cb.call(bind, elems[i])
    }
  }
}
