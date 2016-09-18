const ramdaWorkshopper = require('workshopper-adventure')({
  appDir: __dirname,
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer'),
  fail: require('workshopper-adventure/default/fail'),
  pass: require('workshopper-adventure/default/pass')
})

ramdaWorkshopper.addAll([
  'LIST BASICS',
  'POINTFREE_RAMDA'
])

module.exports = ramdaWorkshopper
