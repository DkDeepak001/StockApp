import { Controller, type Control, FieldValues, Path } from "react-hook-form"
import {
  TextInputProps,
  TextInput,
  View
} from "react-native"
import { Text } from "../Themed"

type FormInputType<T extends FieldValues> = TextInputProps & {
  control: Control<T, any>
  name: Path<T>,
  error: string,
}

export const FormInput = <T extends FieldValues>({ control, name, error, ...props }: FormInputType<T>) => {
  return (
    <Controller
      control={control}
      render={({ field: { onBlur, onChange, value } }) => (
        <View className="w-11/12 items-center flex justify-center mb-4">
          <TextInput className="w-full border border-white/50 rounded-lg py-2 px-4 font-bold text-white"
            placeholderTextColor="gray"
            onChangeText={(text) => onChange(text)}
            value={value}
            onBlur={onBlur}
            {...props}
          />
          <Text className="text-red-500 font-semibold self-start mt-1">{error}</Text>
        </View>
      )}
      name={name}
    />
  )
}
