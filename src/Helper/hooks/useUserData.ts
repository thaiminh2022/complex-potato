import { permFormConverter, userDataConverter } from "@/data/converters"
import { auth, db } from "@/fb"
import { collection, doc, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useDocsQuery } from "../firebaseHelper"

export function useUserData() {
    const [user, authLoad, authError] = useAuthState(auth)
    const docRef = doc(db, "users", user?.uid ?? "dummy").withConverter(userDataConverter);
    const [userData, userLoad, userError] = useDocumentData(docRef);

    return {
        userData: userData,
        auth: user,
        loading: userLoad || authLoad,
        userError: userError,
        authError: authError
    }
}