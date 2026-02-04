import SavedMovieCard from "@/components/SavedMovieCard";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/usefetch";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const {
    data,
    loading,
    error,
    refetch: loadMovies
  } = useFetch(getSavedMovies);

  useFocusEffect(
    useCallback(() => {
      loadMovies();
    }, [])
  );
  return (
    <SafeAreaView className=" flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <View className="w-full flex-row justify-center mt-20 items-center">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>
      <Text className="text-white font-bold text-xl mt-5 mb-5 ml-3">Saved Movies</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.movie_id.toString()}
        renderItem={({ item, index }) => (
          <SavedMovieCard movie={item} />
        )}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                No movies saved. To save movies click the save button in the Movie Details Page
              </Text>
            </View>
          ) : null
        }

      />


    </SafeAreaView>
  );
};

export default Save;
