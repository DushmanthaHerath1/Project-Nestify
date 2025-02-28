import{Account, Avatars, Client, OAuthProvider} from "react-native-appwrite"
import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from "expo-web-browser";
import * as WebBrowser from "expo-web-browser";
import { parseSync } from "@babel/core";

export const config ={
    platform: 'com.ed.nestify',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account =new Account(client);

export async function login(){
    try{
        const redirectUri = Linking.createURL('/');
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        if (!response || typeof response !== 'string') {
            throw new Error('Invalid OAuth response');
        }

        const browserResult = await openAuthSessionAsync(response,redirectUri);

        if (browserResult.type !== 'success') throw new Error('Failed to Login!');

        const url =new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if(!secret || !userId) throw new Error('Failed to Login!');

        const session = await account.createSession(userId, secret);

        if (!session) throw new Error('Failed to create a session!');

        return true;
    }catch(error){
        console.error(error);
        return false;
    }
}

export async function logOut(){
    try{
        await account.deleteSession('current');
        return true;
    }catch(error){
        console.error(error);
        return false;
    }
}

export async function getUser() {
    try{
        const useAvatar = avatar.getInitials(Response.name);

        return{
            ...Response,
            avatar:useAvatar.toString(),
        }
    }catch(error){
        console.error(error);
        return null;
    }
    
}