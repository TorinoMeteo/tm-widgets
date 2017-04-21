export function execFunctionByName (name, context /*, args */) {
  let args = [].slice.call(arguments).splice(2)
  let namespaces = name.split('.')
  let func = namespaces.pop()
  for (let i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]]
  }
  return context[func].apply(this, args)
}
