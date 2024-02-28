import { type ReactNode } from "react"

import onboardingImage1 from '../../assets/images/onboarding/1.jpeg'
import onboardingImage2 from '../../assets/images/onboarding/2.jpeg'
import onboardingImage2_1 from '../../assets/images/onboarding/2_1.jpeg'
import onboardingImage3 from '../../assets/images/onboarding/3.jpeg'
import onboardingImage4 from '../../assets/images/onboarding/4.jpeg'
import { Text } from "react-native"


export type OnBoardingDataType = {
  id: number,
  tittle: ReactNode
  descripition: ReactNode
  image?: any
}

export const OnBoardingData: OnBoardingDataType[] = [
  {
    id: 1,
    tittle: (
      <Text className="text-white font-bold text-2xl">Welcome to Investors Insight Hub!</Text>
    ),
    descripition: (
      <Text className="text-gray-500 text-center font-semibold text-base px-2">Unlock the Power of Community Investing and Connect with Like-minded Investors.</Text>
    ),
    image: onboardingImage1
  }, {
    id: 2,
    tittle: (
      <Text className="text-white font-bold text-2xl">Stay Informed in Real Time</Text>
    ),
    descripition: (
      <Text className="text-gray-500 text-center font-semibold text-base px-2"> Get instant updates on market trends, breaking news, and personalized stock recommendations.</Text>
    ),
    image: onboardingImage2

  }, {
    id: 3,
    tittle: (
      <Text className="text-white font-bold text-2xl">Collaborate and Analyze Stocks</Text>
    ),
    descripition: (

      <Text className="text-gray-500 text-center font-semibold text-base px-2"> Work together on in-depth stock analysis, share charts, and discuss investment strategies.</ Text>
    ),
    image: onboardingImage3
  }, {
    id: 4,
    tittle: (
      <Text className="text-white font-bold text-2xl">Ready to Dive In?</Text>
    ),
    descripition: (
      <Text className="text-gray-500 text-center font-semibold text-base px-2"> Join Investors Insight Hub to access exclusive market insights, customize your investing experience, and become a part of the future of collaborative investing!</Text>
    ),
    image: onboardingImage4
  }
]

