import { Button, Group, Stack } from "@mantine/core";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { staticLinkPaths } from "../../../data/staticPaths";
import { v4 as idv4 } from "uuid";
import AskPermissionForm from "../AskPermissionForm";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../../fb";
import { WriteDocument } from "../../../Helper/firebaseHelper";
import { permFormConverter } from "../../../data/converters";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function UserNewPerm(props: UserNewPermProps) {
    const authState = useAuthState(auth);
    const user = authState[0]
    const navigate = useNavigate();


    const onSubmit = async (data: RawAskPermissionForm) => {

        const formData: AskPermissionForm = {

            uid: user?.uid ?? "hello",
            submitDate: new Date(),
            verified: "None",
            reasons: "",

            ...data
        }

        await WriteDocument("xinphep", formData, permFormConverter);

        navigate(staticLinkPaths.home, { replace: true });
    }

    return <>
        <Stack spacing={"sm"}>
            <Group position="apart">
                <h1>Ask Permission Form</h1>
                <Link to={staticLinkPaths.home}>
                    <Button variant="filled" color={"red"}>
                        Cancel
                    </Button>
                </Link>
            </Group>
            <AskPermissionForm onSubmit={onSubmit} />
        </Stack>
    </>;
}

interface UserNewPermProps {

}
export default UserNewPerm;

