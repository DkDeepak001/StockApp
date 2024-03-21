import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import { BasicInput } from '~/components/commons/textInput'

const Search = () => {
  const navigation = useNavigation()


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <BasicInput placeholder='Search' className='w-80 rounded-full px-7 ' />,
    })
  }, [])

  return (
    <View>
      <Text>Search</Text>
    </View>
  )
}

export default Search
