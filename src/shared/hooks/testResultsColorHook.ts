import {useState} from 'react'
import {TestResultColors, TestResultTypes, TestTypes} from '../types/context/testResultContext'

const useTestResultsColor = () => {
  const [testColor, setTestColor] = useState({
    outer: '',
    inner: '',
  })

  const getTestResultListIconColors = (style) => {
    switch (style) {
      case TestResultColors.Green:
        setTestColor({
          outer: '#DCF3E5',
          inner: '#52c17c',
        })
        break
      case TestResultColors.LimeGreen:
        setTestColor({
          outer: '#e0f6f3',
          inner: '#2DC0AC',
        })
        break
      case TestResultColors.Red:
        setTestColor({
          outer: '#ffc9ce',
          inner: '#ff394d',
        })
        break
      case TestResultColors.Blue:
        setTestColor({
          outer: '#c0deff',
          inner: '#007aff',
        })
        break
      case TestResultColors.Yellow:
        setTestColor({
          outer: '#ffe7bf',
          inner: '#ffb439',
        })
        break
      case TestResultColors.Gold:
        setTestColor({
          outer: '#ffeed2',
          inner: '#ffd700',
        })
        break
      default:
        setTestColor({
          outer: '#e3e3e3',
          inner: '#212121',
        })
        break
    }
  }

  const getTestResultDetailIconColors = (result, type?) => {
    if (type === TestTypes.Covid_FluAB || type === TestTypes.CovidFluAB) {
      setTestColor({
        outer: '#ffe7bf',
        inner: '#ffb439',
      })
      return
    }
    switch (result) {
      case TestResultTypes.Negative:
        setTestColor({
          outer: '#DCF3E5',
          inner: '#52c17c',
        })
        break
      case TestResultTypes.Positive:
      case TestResultTypes.PresumptivePositive:
        setTestColor({
          outer: '#ffc9ce',
          inner: '#ff394d',
        })
        break
      case TestResultTypes.Indeterminate:
        setTestColor({
          outer: '#c0deff',
          inner: '#007aff',
        })
        break
      case TestResultTypes.Vaccine:
        setTestColor({
          outer: '#e0f6f3',
          inner: '#2DC0AC',
        })
        break
      default:
        setTestColor({
          outer: '#e3e3e3',
          inner: '#212121',
        })
        break
    }
  }

  return {testColor, getTestResultListIconColors, getTestResultDetailIconColors}
}

export default useTestResultsColor
