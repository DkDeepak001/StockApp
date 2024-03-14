import { Asset } from "react-native-image-picker"
import { create } from 'zustand'
type state = {
  selectedImages: Asset[]
}

type actions = {
  setSelectedImage: (image: state['selectedImages']) => void
}

type slectedImagesType = state & actions

export const useSelectedImages = create<slectedImagesType>((set) => {
  return {
    selectedImages: [],
    setSelectedImage: (image) => set((state) => ({ selectedImages: [...image] }))
  }
})
