import { useState } from 'react'
import emailRegExp from "@fh-health/utils/emailValidator"

const useEmailValidation = () => {
  const [email, setEmail] = useState<string>('')
  const [isEmailValidated, setIsEmailValidated] = useState<boolean>(false)

  const validateEmail = (value: string) => {
    if (emailRegExp(value)) {
      setEmail(value)
      setIsEmailValidated(true)
    } else {
      setEmail(value)
      setIsEmailValidated(false)
    }
  }

  return { email, isEmailValidated, validateEmail }
}

export default useEmailValidation
