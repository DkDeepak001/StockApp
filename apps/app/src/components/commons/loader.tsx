import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
type LoaderProps = ActivityIndicatorProps & {
  containerstyle?: string
  children?: ReactNode
  fullScreen?: boolean
}
const Loader = ({ containerstyle, children, fullScreen = true, ...props }: LoaderProps) => {
  if (!fullScreen) {
    return <ActivityIndicator size="small" color="#0000ff" {...props} />

  }
  return (
    <SafeAreaView className={`bg-black flex flex-1 justify-center items-center ${containerstyle}`}>
      <ActivityIndicator size="large" color="#0000ff" {...props} className='mb-5' />
      {children}
    </SafeAreaView>
  )
}

export default Loader
