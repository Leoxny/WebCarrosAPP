import { useState, useEffect, useCallback } from "react"
import { View, StyleSheet, ActivityIndicator, FlatList, Keyboard } from "react-native"
import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { db } from "../../services/firebaseConection"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { CarsProps } from "../../types/car.t"
import { CarItem } from "../../components/carlist"

export const HomeScreen = () => {

    const [serachInput, setSerachInput] = useState("")
    const [cars, setCars] = useState<CarsProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCars()
    }, [])

    const loadCars = async () => {
        const carRef = collection(db, "cars")
        const queryRef = query(carRef, orderBy("created", "desc"))

        getDocs(queryRef)
            .then((snapShot) => {
                let listCard = [] as CarsProps[];

                snapShot.forEach((doc) => {
                    listCard.push({
                        id: doc.id,
                        name: doc.data().name,
                        year: doc.data().year,
                        city: doc.data().city,
                        images: doc.data().images,
                        km: doc.data().km,
                        price: doc.data().price,
                        uid: doc.data().uid
                    })
                })

                setCars(listCard)
                setLoading(false)

            })
            .catch((error) => {
                console.log("Ocorreu algum erro inesperado", error)
                setLoading(false)
            })
    }

    const debouce = (func: (...args: string[]) => void, delay: number) => {
        let timeout: NodeJS.Timeout | null = null;

        return (...args: string[]) => {
            if (timeout) {
                clearInterval(timeout)
            }

            timeout = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }

    const handleINputChange = (text: string) => {
        setSerachInput(text)
        delayedApiCall(text)

    }

    const delayedApiCall = useCallback(
        debouce(async (newText: string) => await fetchSerachCar(newText), 800),
        []
    )

    const fetchSerachCar = async (newText: string) => {
        if (newText === "") {
            await loadCars()
            setSerachInput("")
            return
        }

        setCars([])

        const q = query(collection(db, "cars"),
            where("name", ">=", newText.toUpperCase()),
            where("name", "<=", newText.toUpperCase() + "\uf8ff"),
        )

        const querySnapShot = await getDocs(q)

        let listcars = [] as CarsProps[];

        querySnapShot.forEach((doc) => {
            listcars.push({
                id: doc.id,
                name: doc.data().name,
                city: doc.data().city,
                images: doc.data().images,
                km: doc.data().km,
                price: doc.data().price,
                uid: doc.data().uid,
                year: doc.data().year
            })
        })

        setCars(listcars)
        Keyboard.dismiss()
    }

    return (
        <>
            <Header />

            <View style={styles.container}>
                <View style={styles.inputArea}>
                    <Input
                        placeholder="Procurando algum carro?..."
                        value={serachInput}
                        onChangeText={(text) => handleINputChange(text)}
                    />
                </View>

                {loading &&
                    <ActivityIndicator style={{ marginTop: 14 }} size="large" color="#000" />
                }

                <FlatList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CarItem data={item} widthScreen={cars.length <= 1 ? "100%" : "49%"} />}
                    style={styles.carList}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingBottom: 14 }}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f5f8",
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
        alignItems: "center"
    },
    inputArea: {
        width: "100%",
        marginTop: 14,
        padding: 8,
        backgroundColor: "#fff",
        borderRadius: 8
    },
    carList: {
        flex: 1,
        marginTop: 4,
        paddingTop: 14
    }
})