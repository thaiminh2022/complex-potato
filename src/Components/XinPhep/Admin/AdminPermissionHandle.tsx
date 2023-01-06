import { Button, Divider, Group } from "@mantine/core";
import { useDocsQuery } from "@/Helper/firebaseHelper";
import { permFormConverter } from "@/data/converters";
import { limit } from "firebase/firestore";
import { staticLinkPaths } from "@/data/staticPaths";
import ViewPerms from "../PermView/ViewPerms";
import { useNavigate } from "react-router-dom";

function AdminPermissionHandle(props: AdminPermissionHandleProps) {
    const [values] = useDocsQuery<AskPermissionForm>(
        "xinphep",
        permFormConverter,
        limit(10)
    );
    const navigate = useNavigate();

    return (
        <>
            <Group position={"apart"}>
                <h1>Admin - Perm</h1>
                <Button
                    color={"red"}
                    variant={"outline"}
                    onClick={() => navigate(staticLinkPaths.home)}
                >
                    Back
                </Button>
            </Group>
            <Divider />

            <ViewPerms
                values={values ?? []}
                to={staticLinkPaths.xinphepadmin}
            />
        </>
    );
}

interface AdminPermissionHandleProps {}
export default AdminPermissionHandle;
