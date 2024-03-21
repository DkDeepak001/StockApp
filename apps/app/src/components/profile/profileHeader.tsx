import { Image } from "expo-image"
import { Text, View } from "react-native"
import { api } from "~/utils/api"
import { Button } from "../commons/button"

export type ProfileHeaderProps = NonNullable<ReturnType<ReturnType<typeof api.useUtils>['user']['byId']['getData']>>
export const ProfileHeader = (user: ProfileHeaderProps) => {
  return (
    <View className='flex gap-y-5 items-center  w-screen '>
      <Image source={{ uri: user?.imageUrl }} className='w-28 h-28 rounded-full' />
      <View className='flex items-center'>
        <Text className='text-white font-bold text-xl'>@{user?.username}</Text>
        <Text className='text-gray-300 font-semibold text-lg'>{user?.firstName} {user?.lastName}</Text>
      </View>
      <Button variants='fill' className='w-6/12 mb-5'><Text className='font-bold text-lg'>Follow</Text></Button>
    </View>

  )
}

