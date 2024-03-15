import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { View, Text, Pressable } from 'react-native'
import { api } from '~/utils/api'
import Pagination from '../onboarding/pagiantion';
import { files } from '@stockHub/db/src/schema/schema';
import { useState } from 'react';


export type PostProps = NonNullable<ArrayElement<Exclude<ReturnType<ReturnType<typeof api.useUtils>['post']['all']['getData']>, undefined>>>;

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const Post = ({
  id,
  tittle,
  description,
  authorId,
  author,
  fromNow,
  files
}: PostProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0)

  return (
    <View className='p-4 w-full bg-red-200 h-96' key={id}>
      <View className='w-full flex flex-row h-16 gap-x-2 items-center '>
        <Image source={{ uri: author?.imageUrl }} className='h-12 w-12 rounded-full' />
        <View className='flex flex-col gap-y-0'>
          <Text className='font-extrabold text-xl text-white'>{author?.username}</Text>
          <Text className='font-normal text-sm text-white'>{fromNow}</Text>
        </View>
      </View>

      <View className='h-60 w-full bg-green-100'></View>

      <View className='w-full flex flex-row items-center justify-between bg-red-400 py-4 '>
        <View className='flex flex-row gap-x-5 items-center w-1/4 justify-evenly'>
          <Pressable>
            <SimpleLineIcons name="like" size={24} color="white" />
          </Pressable>
          <Pressable>
            <SimpleLineIcons name="dislike" size={24} color="white" />
          </Pressable>
        </View>
        {files.length !== 0 && <View className='w-2/4'>
          <Pagination dots={files.length} active={activeSlide} />
        </View>}
        <Pressable className='w-1/4 items-center flex flex-row justify-end'>
          <Fontisto name="comment" size={24} color="white" />
        </Pressable>


      </View>



    </View >
  )
}

export default Post
