import { View, Image as RnImage, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlashList } from '@shopify/flash-list';
import { PostProps } from '../commons/post';
import { Image } from 'expo-image';
import { router, useSegments } from 'expo-router';


type PostImagesProps = {
  postId: string
  active: number,
  setActive: (num: number) => void
  images: PostProps['files']
}

const PostImages = ({ postId, active, setActive, images, }: PostImagesProps) => {
  const { width } = useWindowDimensions()
  const scrollRef = useRef(null)
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActive(Math.round(e.nativeEvent.contentOffset.x / (width + 20)))
  }

  return (
    <View className='bg-black'>
      <FlashList
        initialScrollIndex={active}
        estimatedItemSize={width * images.length}
        data={images}
        ref={scrollRef}
        renderItem={({ item, index }: { item: PostProps['files'][0], index: number }) => <RenderItem item={item} priority={index === 0} postId={postId} />}
        keyExtractor={(item) => item.id!}
        horizontal
        onScroll={handleScroll}
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
      />
    </View >

  )
}

const RenderItem = ({ item, priority, postId }: { item: PostProps['files'][0], priority: boolean, postId: string }) => {
  const segments = useSegments()
  const { width: screenWidth } = useWindowDimensions()
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    RnImage.getSize(item.url || "", (width, height) => {
      setImageDimensions({ width, height })
    })
  }, [item])

  const maxHeight = Math.floor(screenWidth * (3 / 4)) || 250
  const displayHeight =
    Math.floor(
      (screenWidth / imageDimensions.width) * imageDimensions.height,
    ) || 250
  const computedHeight = Math.floor(
    (screenWidth / imageDimensions.width) * imageDimensions.height,
  )

  return (
    <Pressable className="h-80 items-center flex flex-row"
      onPress={() => segments[0] === "(tabs)" && router.push(`/post/${postId}`)}

    >
      <Image
        source={{ uri: item.url! }}
        style={{
          width: screenWidth,
          height: displayHeight > maxHeight
            ? maxHeight
            : displayHeight
        }}
        cachePolicy={'memory-disk'}
        priority={priority ? "high" : "low"}

        contentFit='contain'
      />
    </Pressable>
  )
}

export default PostImages
