import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Image } from "react-native"

interface ModalProps {
    closeModal: () => void;
    imageUrl: string
}

export const ModalComponent = ({ closeModal, imageUrl }: ModalProps) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButton}>Fechar</Text>
            </Pressable>
            <TouchableWithoutFeedback>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0, 0.9)"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    closeButton: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        position: "absolute",
        top: 100,
        zIndex: 100,
        borderRadius: 4,
        paddingLeft: 14,
        paddingRight: 14,
    },
    buttonText:{
        fontSize: 16
    }
})