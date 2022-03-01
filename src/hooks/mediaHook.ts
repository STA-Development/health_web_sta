import {useState} from 'react'

interface IMediaTypes {
  audio: boolean
  video: boolean
}

const useMediaPermissions = () => {
  const [checkedItems, setCheckedItems] = useState<IMediaTypes>({
    audio: false,
    video: false,
  })

  const updateVideoCheckboxValue = () => {
    setCheckedItems({...checkedItems, video: !checkedItems.video})
  }

  const updateAudioCheckboxValue = () => {
    setCheckedItems({...checkedItems, audio: !checkedItems.audio})
  }

  return {checkedItems, updateVideoCheckboxValue, updateAudioCheckboxValue}
}

export default useMediaPermissions
