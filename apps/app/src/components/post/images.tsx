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
  const segments = useSegments()

  const { width } = useWindowDimensions()

  const scrollRef = useRef(null)


  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActive(Math.round(e.nativeEvent.contentOffset.x / (width + 20)))
  }

  return (
    <Pressable className='bg-black ' onPress={() => segments[0] === "(tabs)" && router.push(`/post/${postId}`)}>
      <FlashList
        initialScrollIndex={active}
        estimatedItemSize={width * images.length}
        data={images}
        ref={scrollRef}
        renderItem={({ item, index }: { item: PostProps['files'][0], index: number }) => <RenderItem item={item} priority={index === 0} />}
        keyExtractor={(item) => item.id!}
        horizontal
        onScroll={handleScroll}
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
      />
    </Pressable >

  )
}

const RenderItem = ({ item, priority }: { item: PostProps['files'][0], priority: boolean }) => {
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

  // TODO: make height calculations cleaner and terse
  const maxHeight = Math.floor(screenWidth * (3 / 4)) || 250

  const displayHeight =
    Math.floor(
      (screenWidth / imageDimensions.width) * imageDimensions.height,
    ) || 250

  const computedHeight = Math.floor(
    (screenWidth / imageDimensions.width) * imageDimensions.height,
  )
  return (
    <View className="h-80 items-center flex flex-row">
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
    </View>
  )
}

export default PostImages
