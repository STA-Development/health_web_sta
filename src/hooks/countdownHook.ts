import {useState} from 'react'

const useCountdown = () => {
  const [displayDuration, setDisplayDuration] = useState<number>(0)

  const startCountdown = (func: () => Promise<unknown>) => {
    let duration = 20
    const timer = setInterval(async () => {
      duration -= 1
      setDisplayDuration(duration)
      if (duration === 0) {
        await func()
        clearInterval(timer)
      }
    }, 1000)
  }

  return {displayDuration, startCountdown}
}

export default useCountdown
