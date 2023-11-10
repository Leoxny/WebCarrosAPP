import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native"

interface LabelsProps {
    label: string;
    children: ReactNode
}

export const Labels = ({ label, children }: LabelsProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{label}</Text>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    name: {
        color: "#444",
        fontWeight: "500"
    }
})