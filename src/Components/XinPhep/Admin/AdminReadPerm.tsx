import {
    Badge,
    Button,
    Divider,
    Group,
    LoadingOverlay,
    Stack,
    Text,
} from "@mantine/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import AskPermissionForm from "../AskPermissionForm";
import { useDoc } from "@/Helper/firebaseHelper";
import { permFormConverter, userDataConverter } from "@/data/converters";
import { staticLinkPaths } from "@/data/staticPaths";
import AdminResponseBtn from "./AdminResponseBtn";
import AdminUserDataView from "./AdminUserDataView";

function AdminReadPerm(props: AdminReadPermProps) {
    const { id } = useParams();
    if (!id) {
        return (
            <div style={{ position: "relative" }}>
                <LoadingOverlay visible={true} />
            </div>
        );
    }

    const [doc, _, _1] = useDoc<AskPermissionForm>(
        "xinphep",
        permFormConverter,
        id
    );
    return (
        <>
            <Group position="apart">
                <div>
                    <h1>Admin Read Perm</h1>
                    <Badge size="md">
                        {doc?.submitDate.toLocaleDateString() ?? "undefineDate"}
                    </Badge>
                </div>
                <Group>
                    <AdminResponseBtn id={id} data={doc} />
                    <Link to={staticLinkPaths.xinphepadmin}>
                        <Button color="red" variant="outline">
                            Back
                        </Button>
                    </Link>
                </Group>
            </Group>

            <Divider
                label={
                    <Text size={"lg"} weight={"bold"}>
                        Form
                    </Text>
                }
                my={"md"}
                labelPosition="center"
                size="lg"
            />
            <AskPermissionForm startValue={doc} readonly={true} />
            <Divider
                label={
                    <Text size={"lg"} weight={"bold"}>
                        User Data
                    </Text>
                }
                my={"md"}
                labelPosition="center"
                size="lg"
            />
            <AdminUserDataView uid={doc?.uid} />
        </>
    );
}

interface AdminReadPermProps {}
export default AdminReadPerm;
