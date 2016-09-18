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

const catTest = function () {
  const noCat = ['deer', 'racoon', 'shibe']
  const yesCat = ['deer', 'racoon', 'cat', 'sea otter']

  const sol1 = this.solutionModule.hasCat(noCat)
  const sub1 = this.submissionModule.hasCat(noCat)

  const sol2 = this.solutionModule.hasCat(yesCat)
  const sub2 = this.submissionModule.hasCat(yesCat)

  if (!equals(sol1, sub1)) {
    exercise.emit('fail', errMsg('hasCat', sol1, sub1))
    return false
  }

  if (!equals(sol2, sub2)) {
    exercise.emit('fail', errMsg('hasCat', sol2, sub2))
    return false
  }

  return true
}

const sumTest = function () {
  const input = [randomInt(), randomInt(), randomInt(), randomInt()]

  const solutionResult = this.solutionModule.sum(input)
  const submissionResult = this.submissionModule.sum(input)

  if (!equals(solutionResult, submissionResult)) {
    exercise.emit('fail', errMsg('sum', solutionResult, submissionResult))
    return false
  }

  return true
}

const evenTest = function () {
  const input = [randomInt(), randomInt(), randomInt(), randomInt(), randomInt()]

  const solutionResult = this.solutionModule.isEven(input)
  const submissionResult = this.submissionModule.isEven(input)

  if (!equals(solutionResult, submissionResult)) {
    exercise.emit('fail', errMsg('isEven', solutionResult, submissionResult))
    return false
  }

  return true
}

const doubleTest = function () {
  const input = [randomInt(), randomInt(), randomInt()]

  const solutionResult = this.solutionModule.double(input)
  const submissionResult = this.submissionModule.double(input)

  if (!equals(solutionResult, submissionResult)) {
    exercise.emit('fail', errMsg('double', solutionResult, submissionResult))
    return false
  }

  return true
}

exercise.addProcessor(function (mode, callback) {
  const tests = [
    doubleTest.call(this),
    evenTest.call(this),
    sumTest.call(this),
    catTest.call(this)
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
