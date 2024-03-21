import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { BasicInput } from '~/components/commons/textInput'
import { api } from '~/utils/api'
import { FlashList } from '@shopify/flash-list'
import { ArrayElement } from '~/components/commons/post'
import { Image } from 'expo-image'
import { router } from 'expo-router'

const Search = () => {
  const [q, setQ] = useState("")
  const { data: users } = api.user.search.useQuery({ q })
  return (
    <View className='flex-1 w-screen'>
      <BasicInput
        placeholder='Search'
        className='w-80 rounded-full px-7 mb-4'
        onChangeText={(t) => setQ(t)}
        autoCapitalize='none'
        value={q}
      />
      <FlashList
        contentContainerStyle={{
          paddingHorizontal: 20
        }}
        data={users}
        ListEmptyComponent={() => <Text className='font-bold text-center text-white'>No Uses found</Text>}
        renderItem={({ item }) => <Searchuser {...item} />}
        estimatedItemSize={20}
      />

      <Text>Search</Text>
    </View>
  )
}

type SearchuserProps = ArrayElement<NonNullable<ReturnType<ReturnType<typeof api.useUtils>['user']['search']['getData']>>>
const Searchuser = (user: SearchuserProps) => {
  return (
    <Pressable className=' flex flex-row items-center gap-x-3' onPress={() => router.push(`/profile/${user.userId}`)}>
      <Image source={{ uri: user.imgUrl }} className='w-10 h-10 rounded-full' />
      <Text className='text-white w-full font-bold text-xl'>{user.userName}</Text>
    </Pressable>
  )
}

export default Search
