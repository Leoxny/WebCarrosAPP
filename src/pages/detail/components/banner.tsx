import { Image, StyleSheet, View, Dimensions } from "react-native"

const { width: widthScreen } = Dimensions.get("window")

export const Banner = ({ url }: { url: string }) => {
    return (
        <Image
            source={{ uri: url }}
            style={styles.cover}
            resizeMode="cover"
        />
    )
}

export const BannerLoad = () => {
    return (
        <View style={styles.loading}></View>
    )

}

const styles = StyleSheet.create({
    cover: {
        width: widthScreen / 1.2,
        height: 330,
        marginLeft: 6,
        marginRight: 6,
        borderRadius: 8,
        marginTop: 8
    },
    loading: {
        width: widthScreen - 16,
        height: 330,
        borderRadius: 8,
        marginTop: 8,
        backgroundColor: "#ddd"
    }
})