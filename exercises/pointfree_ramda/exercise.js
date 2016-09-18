let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const path = require('path')
const fs = require('fs')
const {all, equals} = require('ramda')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// add setup.
exercise.addSetup(function (mode, callback) {
  this.solutionModule = require(getSolutionPath() + 'solution.js')
  this.submissionModule = require([process.cwd(), this.args[0]].join('/'))
  process.nextTick(callback)
})

const randomInt = () => parseInt(1 + Math.random() * 100)
const errMsg = (test, expected, actual) => `Method: ${test},
  Expected: ${expected},
  Actual: ${actual}`

const sumTest = function () {
  const input = [randomInt(), randomInt(), randomInt()]

  const solutionResult = this.solutionModule(input)
  const submissionResult = this.submissionModule(input)

  if (!equals(solutionResult, submissionResult)) {
    exercise.emit('fail', errMsg('sum', solutionResult, submissionResult))
    return false
  }

  return true
}

exercise.addProcessor(function (mode, callback) {
  const tests = [
    sumTest.call(this)
  ]

  process.nextTick(function () {
    callback(null, all(equals(true), tests))
  })
})

exercise.getSolutionFiles = function (callback) {
  var solutionDir = getSolutionPath()

  fs.readdir(solutionDir, function (err, list) {
    if (err) return callback(err)

    list = list
      .filter(function (f) { return (/\.js$/).test(f) })
      .map(function (f) { return path.join(solutionDir, f) })

    callback(null, list)
  })
}

function getSolutionPath () {
  return path.join(exercise.dir, './solution/')
}

module.exports = exercise
