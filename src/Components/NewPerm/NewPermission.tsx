import { Button, Group, Stack } from "@mantine/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { staticLinkPaths } from "../../data/staticPaths";
import AskPermissionForm from "../AskPermissionForm";
import { v4 as idv4 } from "uuid";

function NewPermission(props: NewPermissionProps) {
    const onSubmit = (data: RawAskPermissionForm) => {
        const formData: AskPermissionForm = {

            id: idv4(),
            uid: "",
            submitDate: new Date(),
            isLocked: false,

            ...data
        }

        props.setPapers(prev => [...prev, formData])
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

interface NewPermissionProps {
    setPapers: React.Dispatch<React.SetStateAction<AskPermissionForm[]>>
}
export default NewPermission;