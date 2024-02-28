import {
  TextInputProps,
  TextInput,
  View
} from "react-native"
export function FormInput(props: TextInputProps) {
  return (
    <View className="w-screen items-center flex justify-center mb-2">
      <TextInput className="w-11/12  border border-white/50 rounded-lg py-2 px-4 font-bold text-white" placeholderTextColor="gray" {...props} />
    </View>
  )
}
