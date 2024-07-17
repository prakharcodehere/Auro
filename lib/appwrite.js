
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint : 'https://cloud.appwrite.io/v1', 
    platform: 'com.prakhar.vidiq',
    projectId : '661be4c64fbf30aa79db',
    databaseId: '661c0ef5c5542effcaf8',
    userCollectionId: '661c0f3e08fd57c670f8',
    videoCollectionId: '661c0f794135cc898018',
    storageId: '661c10b6907734453a58'

}


const{

    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = appwriteConfig


// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars  =  new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {

    try {
        
const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
);


if(!newAccount) throw Error;


const avatarUrl = avatars.getInitials(username);


await signIn(email, password);

const newUser = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    ID.unique(),
    {
        accountId : newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
    }
);


return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    
    }
}


export const signIn = async (email, password) => {
try {
    const session = await account.createEmailSession(email, password);
    return session;

} catch (error) {
    throw new Error(error)
}
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
   appwriteConfig.databaseId,
       appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
     } catch (error) {
        console.log(error)
    }
}


export const getAllPosts = async () => {
    try {
        
     

        const posts = await databases.listDocuments(
        databaseId,
         videoCollectionId
       
         
        )

        return posts.documents


    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPost = async () => {
    try {
        
     

        const posts = await databases.listDocuments(
        databaseId,
         videoCollectionId,
         [Query.orderDesc("$createdAt", Query.limit(7))]
       
         
        )

        return posts.documents


    } catch (error) {
        throw new Error(error)
    }
}
