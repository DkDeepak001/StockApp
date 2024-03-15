import { FontAwesome6, Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { View, Text, Pressable } from 'react-native'
import { api } from '~/utils/api'
import Pagination from '../onboarding/pagiantion';
import { files } from '@stockHub/db/src/schema/schema';
import { useState } from 'react';
import PostImages from '../post/images';


export type PostProps = NonNullable<ArrayElement<Exclude<ReturnType<ReturnType<typeof api.useUtils>['post']['all']['getData']>, undefined>>>;

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const Post = ({
  id,
  tittle,
  description,
  author,
  fromNow,
  files
}: PostProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0)

  return (
    <View className='w-full bg-zinc-800 flex flex-col gap-y-1' key={id}>
      <View className='w-full flex flex-row  gap-x-2 items-center px-4 py-4'>
        <Image source={{ uri: author?.imageUrl }} className='h-12 w-12 rounded-full' />
        <View className='flex flex-col gap-y-0'>
          <Text className='font-extrabold text-xl text-white'>{author?.username}</Text>
          <Text className='font-normal text-sm text-white'>{fromNow}</Text>
        </View>
      </View>

      <View className='bg-black '>
        <PostImages
          images={files}
          setActive={(num: number) => setActiveSlide(num)}
          active={activeSlide}
        />
      </View>

      <View className='w-full flex flex-row items-center justify-between  p-4 '>
        <View className='flex flex-row gap-x-5 items-center w-1/4 justify-evenly'>
          <Pressable>
            <SimpleLineIcons name="like" size={24} color="white" />
          </Pressable>
          <Pressable>
            <SimpleLineIcons name="dislike" size={24} color="white" />
          </Pressable>
        </View>
        {files.length !== 1 &&
          <View className='w-2/4'>
            <Pagination dots={files.length} active={activeSlide} />
          </View>}
        <Pressable className='w-1/4 items-center flex flex-row justify-end'>
          <FontAwesome6 name="comment-dots" size={24} color="white" />
        </Pressable>
      </View>
      <View className='flex flex-col gap-y-1 px-4 pb-4'>
        <Text className='font-bold text-xl text-white'>{tittle}</Text>
        <Text className='font-normal text-sm text-white'>{description}</Text>
      </View>
    </View >
  )
}

export default Post
