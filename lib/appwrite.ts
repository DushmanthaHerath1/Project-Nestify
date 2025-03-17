import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  OAuthProvider,
  Query,
  Models,
} from "react-native-appwrite";

import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import * as WebBrowser from "expo-web-browser";
import { parseSync } from "@babel/core";

export const config = {
  platform: "com.ed.nestify",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "",
  collectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || "",
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID || "",
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID || "",
  reviewsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID || "",
  agentsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID || "",
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID || "",
};

// export type Models.Document={
//   $id : string
//   $
// }

const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

// Register User
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount || !newAccount.$id) {
      throw new Error("Account creation failed. No ID returned.");
    }

    // console.log("New Account:", newAccount);
    // console.log("Database ID:", config.databaseId);
    // console.log("Collection ID:", config.collectionId);
    // console.log("New Account ID:", newAccount.$id);

    const avatarUrl = avatars.getInitials(username);
    await signIn_fn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.collectionId,
      ID.unique(),
      {
        account_id: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const signIn_fn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error.message || "an erroe occured");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("Can't find the user!");

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.collectionId,
      [Query.equal("account_id", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("Can't find the user");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const signOut_fn = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestProperties = async () => {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );
    return result.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProperties = async ({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) => {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter != "All") {
      buildQuery.push(Query.equal("type", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );
    }
    if (limit) buildQuery.push(Query.limit(limit));
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );
    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};
