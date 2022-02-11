import {useState} from 'react'
import {TestResultColors} from '@fh-health/types/context/testResultContext'

const useTestResultsColor = () => {
  const [testColor, setTestColor] = useState({
    outer: '',
    inner: '',
  })

  const getTestResultIconColors = (style) => {
    switch (style) {
      case TestResultColors.Green:
        setTestColor({
          outer: '#DCF3E5',
          inner: '#52c17c',
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
      default:
        setTestColor({
          outer: '#e3e3e3',
          inner: '#212121',
        })
        break
    }
  }

  return {testColor, getTestResultIconColors}
}

export default useTestResultsColor
