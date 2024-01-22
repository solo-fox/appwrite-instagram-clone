import { Appwrite } from 'appwrite';
import { Server } from "../utils/config";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    api.sdk = appwrite;
    return appwrite;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create(email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  UpdateAccount: (data) => {
    return api.provider().account.updatePrefs(data);
  },

  createSession: (email, password) => {
    return api.provider().account.createSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, data, read, write);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(collectionId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },
  imageUpload: (image,read,write) => {
    return api
      .provider()
      .storage.createFile(image,read,write);   
  },
  imageView: (fileID) => {
    return api
      .provider()
      .storage.getFileView(fileID);  
  },
  createPost: (collectionId,data,read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, data,read,write);  
  },
  // [`user:${user["$id"]}`],
  // [`user:${user["$id"]}`]
 //createDocument('[COLLECTION_ID]', {});
  //listDocuments('[COLLECTION_ID]');
  listPosts: (collectionId, filters=[],limit=10, offset=0) => {
    return api.provider().database.listDocuments(collectionId, filters,limit, offset);
  },
  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};

export default api;
