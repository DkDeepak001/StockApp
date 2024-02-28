import { Pressable, PressableProps } from "react-native";
import { Text } from "../Themed";
import { ReactNode } from "react";

type ButtonProps = PressableProps & {
  variants: "fill" | "outline"
  children: ReactNode
}

export function Button({ children, variants, className, ...props }: ButtonProps) {

  if (variants === "outline") {
    return (
      <Pressable className={`bg-gray-800 w-2/4 h-12 rounded-xl flex justify-center items-center ${className} `}
        {...props}>
        {children}
      </Pressable >
    )
  }
  return (
    <Pressable className={`bg-white w-2/4 h-12 rounded-xl flex justify-center items-center ${className} `} {...props}>
      {children}
    </Pressable>
  )

}
