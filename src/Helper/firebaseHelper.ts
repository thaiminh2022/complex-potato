import {
    addDoc,
    collection,
    doc,
    DocumentData,
    setDoc,
    WithFieldValue,
    query,
    FirestoreDataConverter,
    QueryConstraint,
    DocumentReference,
    deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../fb";
import {
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";
import { userDataConverter } from "@/data/converters";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "@firebase/auth";

type CollectionType = "users" | "thongbao" | "xinphep";

export async function WriteDocument<T extends WithFieldValue<DocumentData>>(
    collection: CollectionType,
    data: T,
    converter: any
) {
    await writeDB(collection, data, converter);
}
export async function EditDocument<T extends WithFieldValue<DocumentData>>(
    collection: CollectionType,
    id: string,
    data: T,
    converter: any
) {
    await writeDB(collection, data, converter, id);
}
export async function MergeDocument<T extends WithFieldValue<DocumentData>>(
    collection: CollectionType,
    id: string,
    data: T,
    converter: any
) {
    await writeDB(collection, data, converter, id, true);
}

export async function DeleteDocument(collection: CollectionType, id: string) {
    await deleteDoc(doc(db, collection, id));
}

export function useDoc<T>(
    collectionName: CollectionType,
    converter: FirestoreDataConverter<T>,
    id: string
) {
    return useDocumentData<T>(
        doc(db, collectionName, id).withConverter(converter)
    );
}
// Query should be condition only
export function useDocsQuery<T>(
    collectionName: CollectionType,
    converter: FirestoreDataConverter<T>,
    ...queryCondition: QueryConstraint[]
) {
    const q = query(
        collection(db, collectionName).withConverter(converter),
        ...queryCondition
    );
    return useCollectionData<T>(q);
}
export async function LoginAccount(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
}

export async function LogoutAccount() {
    await signOut(auth);
}
export async function CreateAccount(email: string, password: string) {
    const datas = await createUserWithEmailAndPassword(auth, email, password);
    return datas;
}
export async function CreateAccountAndPushToDB(
    email: string,
    password: string,
    userData: UserData
) {
    const datas = await CreateAccount(email, password);
    await writeDB("users", userData, userDataConverter, datas.user.uid);
}

async function writeDB(
    collectionName: CollectionType,
    data: any,
    converter: any,
    id?: string,
    merge?: boolean
) {
    const useMerge = merge ?? false;

    if (id) {
        const ref = doc(db, collectionName, id).withConverter(converter);
        await setDoc(ref, data, { merge: useMerge });
    } else {
        const ref = collection(db, collectionName).withConverter(converter);
        await addDoc(ref, data);
    }
}
