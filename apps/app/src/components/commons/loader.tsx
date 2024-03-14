import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
type LoaderProps = ActivityIndicatorProps & {
  containerstyle?: string
  children?: ReactNode
}
const Loader = ({ containerstyle, children, ...props }: LoaderProps) => {
  return (
    <SafeAreaView className={`bg-black flex flex-1 justify-center items-center ${containerstyle}`}>
      <ActivityIndicator size="large" color="#0000ff" {...props} className='mb-5' />
      {children}
    </SafeAreaView>
  )
}

export default Loader
