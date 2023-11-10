import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Modal, ScrollView } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackParamList } from "../../routes"
import { CarDetailProps } from "../../types/car.t"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConection"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { BannerList } from "./components/bannerlist"
import { BannerLoad } from "./components/banner"
import { Labels } from "./components/labels"
import * as Linking from 'expo-linking';
import { ModalComponent } from "./components/modal"
import { useStorage } from "../../hooks/useStorage"
import { useToast } from "../../hooks/useToast"

type RouteDetailParams = {
    detail: {
        id: string
    }
}

type DetailRouteProps = RouteProp<RouteDetailParams, "detail">

export const DetailScreen = () => {

    const route = useRoute<DetailRouteProps>()
    const [car, setCar] = useState({} as CarDetailProps)
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const { saveItem } = useStorage()
    const { showToast } = useToast()

    useEffect(() => {
        loadCars()
    }, [route.params?.id])

    const loadCars = async () => {
        if (!route.params?.id) {
            return
        }

        const docRef = doc(db, "cars", route.params.id)
        getDoc(docRef)
            .then((snapShot) => {
                if (!snapShot.data()) {
                    navigation.goBack()
                }

                setCar({
                    id: snapShot.id,
                    name: snapShot.data()?.name,
                    year: snapShot.data()?.year,
                    city: snapShot.data()?.city,
                    created: snapShot.data()?.created,
                    description: snapShot.data()?.description,
                    images: snapShot.data()?.images,
                    km: snapShot.data()?.km,
                    model: snapShot.data()?.model,
                    owner: snapShot.data()?.owner,
                    price: snapShot.data()?.price,
                    uid: snapShot.data()?.uid,
                    whatsapp: snapShot.data()?.whatsapp
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleCallPhone = async () => {
        await Linking.openURL(`tel:${car?.whatsapp}`)
    }

    const openImage = (imageUrl: string) => {
        setModalVisible(true)
        setSelectedImage(imageUrl)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
        setSelectedImage("")
    }

    const handleFavoritesCar = async () => {
        if (!car) {
            return
        }
        await saveItem(car)
        showToast("Carro favoritado com sucesso!", "SUCCESS")
    }

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView >
                <View style={styles.container}>
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={36} color={"#000"} />
                    </Pressable>

                    {loading && <BannerLoad />}

                    {!loading && car?.images &&
                        <BannerList
                            images={car.images}
                            handleoPenImage={(imageUrl) => openImage(imageUrl)}
                        />
                    }

                    <View style={styles.header}>
                        <Pressable style={styles.saveContent} onPress={handleFavoritesCar}>
                            <Feather size={22} color="#fff" name="bookmark" />
                        </Pressable>

                        <Text style={styles.title}>{car?.name}</Text>
                        <Text >{car?.model}</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.price}>R$: {car?.price}</Text>

                        <View style={styles.labels}>
                            <Labels label="Cidade">
                                <Text>{car?.city}</Text>
                            </Labels>

                            <Labels label="Ano">
                                <Text>{car?.year}</Text>
                            </Labels>
                        </View>

                        <View style={styles.labels}>
                            <Labels label="KM Rodados">
                                <Text>{car?.km}</Text>
                            </Labels>

                            <Labels label="Telefone">
                                <Text>{car?.whatsapp}</Text>
                            </Labels>
                        </View>

                        <Text style={styles.description}>
                            Descrição completa:
                        </Text>
                        <View style={styles.descriptionArea}>
                            <Text>{car?.description}</Text>
                        </View>

                        <Pressable style={styles.callButton} onPress={handleCallPhone}>
                            <Text style={styles.callText}>Entrar em contato</Text>
                        </Pressable>
                    </View>

                    <Modal visible={modalVisible} transparent={true}>
                        <ModalComponent
                            closeModal={handleCloseModal}
                            imageUrl={selectedImage}
                        />
                    </Modal>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f5f9",
        alignItems: "center",
        paddingBottom: 16
    },
    backButton: {
        width: 52,
        height: 52,
        borderRadius: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 24,
        top: 44,
        zIndex: 99
    },
    header: {
        backgroundColor: "#fff",
        position: "relative",
        width: "90%",
        borderRadius: 8,
        gap: 4,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 8,
        paddingRight: 8,
        top: -34,
        zIndex: 99
    },
    saveContent: {
        backgroundColor: "#ef4444",
        position: "absolute",
        zIndex: 99,
        padding: 12,
        borderRadius: 99,
        right: 8,
        top: -24
    },
    title: {
        fontWeight: "bold",
        fontSize: 18
    },
    content: {
        alignSelf: "flex-start",
        paddingLeft: 14,
        paddingRight: 14,
        margintop: -14,
        width: "100%"
    },
    price: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#000"
    },
    labels: {
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        marginTop: 14
    },
    description: {
        fontSize: 18,
        marginTop: 14,
        marginBottom: 8,
        fontWeight: "bold",
        color: "#000",
    },
    descriptionArea: {
        backgroundColor: "#fff",
        padding: 4,
        borderradius: 4,
    },
    callButton: {
        width: "100%",
        padding: 8,
        backgroundColor: "#08c168",
        marginTop: 14,
        marginBottom: 14,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    callText: {
        fontSize: 16,
        fontWeight: "500"
    }
})