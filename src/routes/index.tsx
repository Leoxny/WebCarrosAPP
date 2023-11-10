import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "../pages/home";
import { DetailScreen } from "../pages/detail";
import { FavoritesScreen } from "../pages/favorites";

export type StackParamList = {
    home: undefined;
    detail: { id: string };
    favorites: undefined;
}

const Stack = createNativeStackNavigator<StackParamList>()

export const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="detail" component={DetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="favorites" component={FavoritesScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}