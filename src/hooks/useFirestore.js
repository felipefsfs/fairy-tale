import { useState } from "react";
import firebase from "../config/fb";

const db = firebase.firestore();
firebase.firestore().enablePersistence().catch(function(err) {
  if (err.code === 'failed-precondition') {
    console.log("Single Tab only", err.code);
  } else if (err.code === 'unimplemented') {
    console.log(err.code);
  }
});

export default function useFirestore() {
  const [working, setWorking] = useState(false);
  
  return [
    { working },
    { add, del, update }
  ];

  async function add(collection_path = [], document = {}) {
    console.log(collection_path, document);
    try {
      setWorking(true);
      if (collection_path.length > 0 && collection_path.length % 2 === 1) {
        const collection = collection_path.reduce((fb_obj, path, index) => {
          return (index % 2 === 0 && fb_obj.collection(path)) || fb_obj.doc(path);
        }, db);
        console.log(collection);
        return await collection.add(document);
      } else {
        const e = Error("Collection Path malformed");
        e.code = "COLLECTION_PATH_MALFORMED";
        throw e;
      }
    } catch(e) {
      console.log(e);
      return e.code;
    } finally {
      setWorking(false);
    }
  }

  async function del(collection_path = [], field_path = "") {
    const del_flag = { "deleted": true };
    return update(collection_path, (!!field_path && { field_path: del_flag }) || del_flag);
  }

  async function update(collection_path = [], document = {}) {
    try {
      setWorking(true);
      if (collection_path.length > 0 && collection_path.length % 2 === 0) {
        const doc = collection_path.reduce((fb_obj, path, index) => {
          return (index % 2 === 0 && fb_obj.collection(path)) || fb_obj.doc(path);
        }, db);
        return await doc.update(document);
      } else {
        const e = Error("Collection Path malformed");
        e.code = "COLLECTION_PATH_MALFORMED";
        throw e;
      }
    } catch(e) {
      console.log(e.code);
      return e.code;
    } finally {
      setWorking(false);
    }
  }
}
