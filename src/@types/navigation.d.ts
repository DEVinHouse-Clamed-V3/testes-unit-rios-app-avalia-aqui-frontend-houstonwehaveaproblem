import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Intro: undefined
  Products: undefined
  Evaluations: { productId: number }
}

export type ScreenNavigationProp<T extends keyof RootStackParamList> = 
  NativeStackNavigationProp<RootStackParamList, T>

export type ScreenRouteProp<T extends keyof RootStackParamList> = {
  route: RouteProp<RootStackParamList, T>
  navigation: ScreenNavigationProp<T>
}