import { useDoc } from "@/Helper/firebaseHelper";
import { userDataConverter } from "@/data/converters";
import { LoadingOverlay } from "@mantine/core";
import React from "react";

function AdminUserDataView(props: AdminUserDataViewProps) {
    const uid = props.uid;
    if (!uid) {
        return (
            <div style={{ position: "relative" }}>
                <LoadingOverlay visible={true} />;
            </div>
        );
    }

    const [userDoc, _, _1] = useDoc<UserData>(
        "xinphep",
        userDataConverter,
        uid
    );

    return <></>;
}

interface AdminUserDataViewProps {
    uid?: string;
}
export default AdminUserDataView;
