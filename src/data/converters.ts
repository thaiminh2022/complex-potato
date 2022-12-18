import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, snapshotEqual, SnapshotOptions, Timestamp, WithFieldValue } from "firebase/firestore"

export const permFormConverter: FirestoreDataConverter<AskPermissionForm> = {


    toFirestore(data: AskPermissionForm): DocumentData {
        const raw: RawAskPermissionForm = { ...data }

        return {
            ...raw,

            submitDate: Timestamp.fromDate(data.submitDate),
            verified: data.verified,
            verifiedReasons: data.verifiedReasons
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): AskPermissionForm {
        const data = snapshot.data() as { dateData: Timestamp } & AskPermissionForm;

        return {
            ...data,
            id: snapshot.id,
            dateData: data.dateData.toDate(),
        }
    }
};


export const userDataConverter: FirestoreDataConverter<UserData> = {
    toFirestore(data: UserData): DocumentData {
        const raw: RawUserData = { ...data }


        return {
            ...raw,
            createdDate: Timestamp.fromDate(data.createdDate),
            isAdmin: data.isAdmin

        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): UserData {
        const data = snapshot.data() as { createdDate: Timestamp } & UserData;

        return {
            ...data,
            id: snapshot.id,
            createdDate: data.createdDate.toDate()
        }
    }
};
