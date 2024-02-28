import { View } from "react-native";


type PaginationPropsType = {
  dots: number
  active: number
  className?: string
}

export default function Pagination({ dots, active, className = "h-2 w-2 rounded-full" }: PaginationPropsType) {
  return (
    <View className="w-full items-center justify-center gap-x-2 flex-row">
      {Array(dots).fill(0).map((_, i) => <View
        key={i}
        className={`rounded-full ${i === active ? "bg-white" : "bg-gray-700"
          } ${className}`}
      />
      )}
    </View>
  )
}
