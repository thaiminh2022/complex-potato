import { permFormConverter } from "@/data/converters";
import { staticLinkPaths } from "@/data/staticPaths";
import { useDoc, EditDocument } from "@/Helper/firebaseHelper";
import { Badge, Button, Divider, Group, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLoader3, IconPencil, IconThumbDown, IconThumbUp } from "@tabler/icons";
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import AskPermissionForm from "../AskPermissionForm";


function UserEditPerm(props: UserEditPermProps) {
    const { id } = useParams();
    const [val] = useDoc<AskPermissionForm>("xinphep", permFormConverter, id!);

    const badgeData = useMemo(() => {
        const iconSize = 16;

        if (val?.verified == "Accepted") {
            return {
                color: "green", icon: < IconThumbUp size={iconSize} />
            }
        }
        else if (val?.verified == "Rejected") {
            return {
                color: "red", icon: < IconThumbDown size={iconSize} />
            }
        }

        return {
            color: undefined, icon: < IconLoader3 size={iconSize} />
        }

    }, [val?.verified])
    const readonly = val?.verified != "Pending";

    const onSubmit = async (v: RawAskPermissionForm) => {
        // const data: AskPermissionForm = {
        //     ...val,
        //     ...v
        // }

        // await EditDocument("xinphep", id, data, permFormConverter).catch(x => {
        //     console.log("has bad error" + x);

        // });
        // console.log("Edited");
    }

    return (
        <>
            <Stack spacing={"sm"}>
                <Group position="apart">
                    <Group>
                        <h1>Edit Form</h1>
                        <Badge size="lg" color={badgeData.color} leftSection={badgeData.icon}>{val?.verified}</Badge>
                    </Group>
                    <Group>
                        <Button variant="outline" color="red" disabled={readonly}>Delete</Button>
                    </Group>
                </Group>
                <div >
                    <Text weight={500} underline>{val?.verified} Reason:</Text>
                    <Text weight={500}>{val?.verifiedReasons}</Text>
                </div>
                <Divider mb={"md"} />
            </Stack>


            {
                val &&
                <AskPermissionForm
                    onSubmit={(v) => onSubmit(v)}
                    readonly={readonly}
                    startValue={val}
                />
            }

            <Group position="right" mt={"md"}>
                <Link to={staticLinkPaths.xinphep}>
                    <Button variant="light">Cancel</Button>
                </Link>
                <Button leftIcon={<IconPencil />} disabled={readonly}>Change</Button>
            </Group>

        </>
    );
}

interface UserEditPermProps {

}
export default UserEditPerm;