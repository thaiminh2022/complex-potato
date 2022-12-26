import { permFormConverter } from "@/data/converters";
import { staticLinkPaths } from "@/data/staticPaths";
import { useDocsQuery } from "@/Helper/firebaseHelper";
import { Button, Divider, Stack, Group, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";


import { where } from "firebase/firestore";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "@/Helper/hooks/useUserData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/fb";
import ViewPerms from "../PermView/ViewPerms";


function UserViewPerms(props: UserViewPermsProps) {
    const [user] = useAuthState(auth);
    const [values] = useDocsQuery<AskPermissionForm>("xinphep", permFormConverter, where("uid", "==", user?.uid ?? "hello"));



    return (
        <>
            <Group position="apart" align={"center"}>

                <h1>View</h1>

                <Group>
                    <Link to={staticLinkPaths.xinphepmoi}>
                        <Button>Xin Phep Moi</Button>
                    </Link>
                    <Link to={staticLinkPaths.home}>
                        <Button variant="outline">Back</Button>
                    </Link>
                </Group>
            </Group>
            <Divider my={"sm"} />

            <ViewPerms values={values ?? []} to={`${staticLinkPaths.xinphep}`} />
        </>
    );
}

interface UserViewPermsProps {

}


export default UserViewPerms;