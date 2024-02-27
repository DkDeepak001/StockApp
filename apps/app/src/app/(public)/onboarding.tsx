import { FlatList, Text, View, Image, useWindowDimensions } from 'react-native'
import { OnBoardingData, OnBoardingDataType } from '~/constants/onBoardingData';
export default function OnBoardingScreen() {
  console.log("=================OnBoardingScreen==========================")
  return (
    <View className="flex-1 bg-black">
      <FlatList
        pagingEnabled
        horizontal
        data={OnBoardingData}
        renderItem={renderItem}
      />
    </View>
  );
}

type renderItemType = {
  item: OnBoardingDataType
}

const renderItem = ({ item }: renderItemType) => {
  return (
    <View className={`flex flex-1 w-full h-full  bg-red-200`} >
      {item.tittle}
      {item.descripition}
    </View >
  )
}


