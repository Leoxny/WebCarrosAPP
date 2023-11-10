import { useEffect, useRef } from "react"
import { Text, StyleSheet, Pressable, Animated, View } from "react-native"
import { MessagesProps } from "../contexts/ToastContext"

interface ToastProps {
    messages: MessagesProps[];
    hideToast: () => void
}

export const Toast = ({ messages, hideToast }: ToastProps) => {

    const opacityAnimated = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (messages) {
            Animated.timing(opacityAnimated, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            }).start();
        }
    }, [messages])

    return (
        <Animated.View
            style={[styles.container, { opacity: opacityAnimated }]}
        >
            {messages && messages.map((item, index) => (
                <Pressable
                    style={[styles.toast, item.type === "DEFAULT" ? styles.default : styles.sucess]}
                    onPress={hideToast}
                    key={index}
                >
                    <Text style={styles.toastText}>{item.message}</Text>
                </Pressable>
            ))}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        marginLeft: 14,
        marginRight: 14,
    },
    toastText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
    toast: {
        backgroundColor: "rgba(0,0,0, 0.8)",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 8,
        borderRadius: 8
    },
    default: {
        backgroundColor: "rgba(0,0,0, 0.89)"
    },
    sucess: {
        backgroundColor: "rgba(0,184,95,0.89)"
    }
})