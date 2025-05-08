import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/@types/navigation";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Intro from "./src/screens/Intro";
import Products from "./src/screens/Product";
import Evaluations from "./src/screens/Evaluation";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
            <StatusBar backgroundColor="#fff"/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Intro">
                    <Stack.Screen
                        name="Intro"
                        component={Intro}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Products"
                        component={Products}
                        options={{ headerTitle: 'Listagem dos produtos', headerBackTitle: '' }}
                    />
                    <Stack.Screen
                        name="Evaluations"
                        component={Evaluations}
                        options={{ headerTitle: 'Avaliações', headerBackTitle: 'Voltar'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
