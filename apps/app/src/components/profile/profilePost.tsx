import { Pressable, Text, View } from "react-native"
import { ArrayElement } from "../commons/post"
import { ProfileHeaderProps } from "./profileHeader"
import { Image } from "expo-image"
import { router } from "expo-router"

type ProfilePostProps = ArrayElement<NonNullable<ProfileHeaderProps['post']>>
export const ProfilePost = (post: ProfilePostProps) => {
  return (
    <Pressable className='w-[45%] bg-red-100 h-40 rounded-lg' onPress={() => router.push(`/post/${post.id}`)}>
      <Image source={{ uri: post?.files?.[0]?.url }} className='w-full h-full rounded-lg' />
      <View className='absolute w-full h-full bg-black/50 justify-end'>
        <Text className='text-white font-bold mb-3 ml-2' numberOfLines={1} ellipsizeMode='tail'>{post.tittle}</Text>
      </View>
    </Pressable>
  )
}

