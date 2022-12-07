import { addDoc, collection, doc, DocumentData, FirestoreDataConverter, setDoc, WithFieldValue } from "firebase/firestore";
import { db } from "../fb";

type CollectionType = "user" | "thongbao" | "xinphep"

export async function WriteDocument<T extends WithFieldValue<DocumentData>>(collection: CollectionType, data: T, converter: any) {

    await writeDB(collection, data, converter);
}
export async function EditDocument<T extends WithFieldValue<DocumentData>>(collection: CollectionType, id: string, data: T, converter: any) {
    await writeDB(collection, data, converter, id);

}

async function writeDB(collectionName: CollectionType, data: any, converter: any, id?: string) {
    if (id) {
        const ref = doc(db, collectionName, id).withConverter(converter);
        await setDoc(ref, data).catch(x => console.log("Error by id"));
    }
    else {
        const ref = collection(db, collectionName).withConverter(converter);
        await addDoc(ref, data).catch(x => console.log("erorr no id"));
    }



}