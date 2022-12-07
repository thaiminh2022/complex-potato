import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, snapshotEqual, SnapshotOptions, Timestamp, WithFieldValue } from "firebase/firestore"

export const permFormConverter: FirestoreDataConverter<AskPermissionForm> = {
    toFirestore(data: AskPermissionForm): DocumentData {
        const raw: RawAskPermissionForm = { ...data }

        return {
            ...raw,

            submitDate: Timestamp.fromDate(data.submitDate),
            verified: data.verified,
            reasons: data.reason,

        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): AskPermissionForm {
        const data = snapshot.data() as AskPermissionForm;

        return {
            ...data,
            id: snapshot.id,
        }
    }
};
