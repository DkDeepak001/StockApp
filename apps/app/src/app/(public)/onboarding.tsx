import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, View, useWindowDimensions } from 'react-native'
import { OnBoardingData, OnBoardingDataType } from '~/constants/onBoardingData';
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context';
import Pagination from '~/components/onboarding/pagiantion';
import { Button } from '~/components/commons/button';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';

export default function OnBoardingScreen() {
  const [active, setActive] = useState<number>(0)
  const { width } = useWindowDimensions()
  const flatlistRef = useRef<FlatList<OnBoardingDataType>>(null)
  const router = useRouter()
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActive(Math.round(e.nativeEvent.contentOffset.x / (width + 20)))
  }
  const handleNext = () => {
    console.log("handle", active)
    if (active < 3) {
      flatlistRef.current?.scrollToIndex({
        index: active + 1,
        animated: true,
      })
    } else {
      router.push("/authHome")
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className='h-[85%] '>
        <FlatList
          ref={flatlistRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={handleScroll}
          data={OnBoardingData}
          renderItem={({ item }) => <RenderItem item={item} />}
        />
      </View>
      <View className='h-[15%] items-center flex justify-evenly '>
        <Pagination dots={OnBoardingData.length} active={active} />
        <Button variants='fill' onPress={handleNext}>
          <Text className='font-black tracking-wider text-xl'>Next</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}



type renderItemType = {
  item: OnBoardingDataType
}

const RenderItem = ({ item }: renderItemType) => {
  return (
    <View className={`flex h-full w-screen  items-center gap-y-5  `} >
      <Image source={item.image} className='w-full h-2/5 mb-5 flex-4' contentFit='cover' />
      <View className='flex items-center justify-center gap-y-1 flex-2'>
        {item.tittle}
        {item.descripition}
      </View >
    </View>
  )
}


