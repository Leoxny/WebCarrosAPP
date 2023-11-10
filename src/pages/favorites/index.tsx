import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamList } from "../../routes"
import { CarsProps } from "../../types/car.t"
import { CarItem } from "../../components/carlist"
import { useStorage } from "../../hooks/useStorage"
import { useToast } from "../../hooks/useToast"

export const FavoritesScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    const [cars, setCars] = useState<CarsProps[]>([])
    const { getItem, removeItem } = useStorage()
    const isFocused = useIsFocused()
    const { showToast } = useToast()

    useEffect(() => {
        if (isFocused) {
            loadFavoiteCars()
        }
    }, [isFocused])

    const loadFavoiteCars = async () => {
        const listCars = await getItem()
        setCars(listCars)
    }

    const handleRemoveCar = async (id: string) => {
        const listCars = await removeItem(id)
        setCars(listCars)
        showToast("Carro removido dos favoritos!", "DEFAULT")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Feather size={32} name="arrow-left" color={"#000"} />
                </Pressable>
                <Text style={styles.title}>Meus favoritos</Text>
            </View>

            <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CarItem
                        data={item}
                        widthScreen={"100%"}
                        enableRemove={true}
                        removeItem={() => handleRemoveCar(item.id)}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 14 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f5f8",
        paddingLeft: 14,
        paddingRight: 14
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        paddingTop: 8,
        paddingBottom: 8
    },
    title: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
    },
    list: {
        flex: 1,
        marginTop: 14,
        paddingTop: 14
    }
})