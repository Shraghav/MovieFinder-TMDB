import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { images } from "@/constants/images";

const SavedMovieCard = ({ movie: { movie_id, movie_title, poster_url } }: SavedMovieCardProps) => {
    return (
        <Link href={`/movie/${movie_id}`} asChild>
            <TouchableOpacity className="w-32 relative pl-5">
                <Image
                    source={{ uri: poster_url }}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />
                <Text
                    className="text-sm font-bold mt-2 text-light-200"
                    numberOfLines={2}
                >
                    {movie_title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

export default SavedMovieCard