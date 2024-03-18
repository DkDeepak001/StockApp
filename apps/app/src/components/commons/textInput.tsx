import { Controller, type Control, FieldValues, Path } from "react-hook-form"
import {
  TextInputProps,
  TextInput,
  Text,
  View,
} from "react-native"

type FormInputType<T extends FieldValues> = TextInputProps & {
  control: Control<T, any>
  name: Path<T>,
  error: string,
}

export const FormInput = <T extends FieldValues>({ control, name, error, className, ...props }: FormInputType<T>) => {
  return (
    <Controller
      control={control}
      render={({ field: { onBlur, onChange, value } }) => (
        <View className="w-11/12 items-center flex justify-center mb-2">
          <BasicInput className={`${className}`}
            placeholderTextColor="gray"
            onChangeText={(text) => onChange(text)}
            value={value}
            onBlur={onBlur}
            {...props}
          />
          <Text className="text-red-400 font-semibold text-start w-11/12 mt-1">{error}</Text>
        </View>
      )}
      name={name}
    />
  )
}

export const BasicInput = ({ className, ...props }: TextInputProps) => {
  return (
    <View className="w-11/12 items-center flex justify-center ">
      <TextInput className={`w-full rounded-2xl py-4 px-4 font-bold text-white bg-zinc-800 ${className}`}
        placeholderTextColor="#cccccc"
        {...props}
      />
    </View>
  )
}


