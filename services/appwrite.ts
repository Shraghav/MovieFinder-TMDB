import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const MOVIE_COLLECTION_ID =
  process.env.EXPO_PUBLIC_MOVIES_APPWRITE_COLLECTION_ID!;
const client = new Client()
  .setEndpoint("https://sfo.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    //actual query that we are saerching
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        },
      );
      console.log("Inside Update search count if block:", result.documents);
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
      console.log("Inside Update search count else block:", result.documents);
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const saveMovie = async (movie: SavedMovies) => {
  try {
    const existingMovies = await database.listDocuments(
      DATABASE_ID,
      MOVIE_COLLECTION_ID,
      [Query.equal("movie_id", movie.movie_id)],
    );

    console.log("Saved movies:", existingMovies.total);
    if (existingMovies.total === 0) {
      const result = await database.createDocument(
        DATABASE_ID,
        MOVIE_COLLECTION_ID,
        ID.unique(),
        {
          movie_id: movie.movie_id, // Store the ID for future checks
          movie_title: movie.movie_title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_url}`,
          year: movie.year,
          runtime: movie.runtime,
        },
      );
      console.log(
        "Movies are not present initially ins save and being saved:",
        result.$id,
      );
      return result;
    } else {
      console.log("Result in else:", existingMovies.documents);
      const doc = existingMovies.documents[0];
      const docId = doc.$id;
      const newDeleteStatus = !doc.isDelete;
      await database.updateDocument(DATABASE_ID, MOVIE_COLLECTION_ID, docId, {
        isDelete: newDeleteStatus,
      });
      console.log("Movie Removed from saved lists");
      return [];
    }
  } catch (error) {
    console.error("Error in deleting documents", error);
    throw error;
  }
};

export const getSavedMovies = async (): Promise<SavedMovies[]> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      MOVIE_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.equal("isDelete", false)], // Shows newest additions first
    );
    console.log("Returning saved movies:", result.documents.length);
    return result.documents as unknown as SavedMovies[];
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    return [];
  }
};
