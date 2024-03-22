import { create } from "zustand";

type state = {
  userName: string,
  fistName: string,
  lastName: string,
  email: string,
  imgUrl: string,
}

type actions = {
  setFromPage1: (formData: state) => void
}
type signUpStoreType = state & actions


const initalValue: state = {
  imgUrl: "",
  email: "",
  fistName: "",
  lastName: "",
  userName: ""
}

export const useSignUpStore = create<signUpStoreType>((set) => {
  return {
    ...initalValue,
    setFromPage1: (formData) => set({
      ...formData
    })
  }
})
