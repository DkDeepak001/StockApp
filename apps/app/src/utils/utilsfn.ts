import { useState } from "react"

export const useIsReady = () => {
  const [loading, setLoading] = useState<boolean>(true)

  requestAnimationFrame(() => {
    setLoading(false)
  })

  return { loading }
}

