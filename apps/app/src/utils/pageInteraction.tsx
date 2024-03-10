import { useEffect, useState } from "react"
import { InteractionManager } from "react-native"





export const usePageInteraction = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      setReady(true),
    )

    return () => interactionPromise.cancel()
  }, [])

  return {
    ready,
  }
}

