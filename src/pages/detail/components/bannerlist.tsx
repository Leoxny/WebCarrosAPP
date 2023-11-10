import { FlatList, TouchableOpacity } from "react-native"
import { ImagesProps } from "../../../types/car.t"
import { Banner } from "./banner";

interface BannerLIstProps {
    images: ImagesProps[];
    handleoPenImage: (imageUrl: string) => void
}

export const BannerList = ({ images, handleoPenImage }: BannerLIstProps) => {
    return (
        <FlatList
            data={images}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.9} onPress={() => handleoPenImage(item.url)}>
                    <Banner url={item.url} />
                </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />

    )
}