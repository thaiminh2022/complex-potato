import { OpenModalWithCustomJSX } from "@/Helper/Modals/generalModals";
import { DeleteDocument, MergeDocument } from "@/Helper/firebaseHelper";
import { NewNotificationWithGoodBad } from "@/Helper/notifications/normalNotification";
import { permFormConverter } from "@/data/converters";
import { staticLinkPaths } from "@/data/staticPaths";
import {
    Menu,
    Button,
    Modal,
    Group,
    Stack,
    Textarea,
    Text,
    TextInput,
} from "@mantine/core";
import {
    IconCircleX,
    IconCheck,
    IconClock,
    IconTrash,
    IconPencil,
} from "@tabler/icons";
import React, { useRef } from "react";
import { resolvePath, useNavigate } from "react-router-dom";

function AdminResponseBtn(props: AdminResponseBtnProps) {
    const responseRef = useRef<HTMLTextAreaElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const responseHandle = (responseData: FormStatus) => {
        OpenModalWithCustomJSX({
            title: "Tell us the reason",
            children: (
                <>
                    <Group grow>
                        <Textarea
                            icon={<IconPencil />}
                            autosize
                            ref={responseRef}
                            placeholder={`Enter your reasons for responding with ${responseData}`}
                            label="Reason"
                        />
                    </Group>
                </>
            ),
            onConfirm: async () => {
                if (props.data) {
                    console.log(responseRef.current?.value);
                    await MergeDocument(
                        "xinphep",
                        props.id,
                        {
                            ...props.data,
                            verifiedReasons: responseRef.current?.value ?? "",
                            verified: responseData,
                        },
                        permFormConverter
                    );

                    NewNotificationWithGoodBad(
                        {
                            title: "Update",
                            message: `You have mark ${responseData}`,
                        },
                        false
                    );

                    navigate(staticLinkPaths.xinphepadmin, { replace: true });
                    return;
                }

                NewNotificationWithGoodBad(
                    {
                        title: "Cannot mark" + responseData,
                        message: `We cannot upadte that field, try again later`,
                    },
                    true
                );
            },
            labels: {
                cancel: "Cancel",
                confirm: "Confirm",
            },
        });
    };

    const deleteHandle = () => {
        OpenModalWithCustomJSX({
            title: "Delete document",
            children: (
                <>
                    <Text size={"lg"}>
                        The user WILL NOT BE NOTIFIED about this behavior,
                        consider using REJECT instead.
                    </Text>

                    <Group position="left" spacing={"xs"}>
                        <Text>Parent name is: </Text>
                        <Text>
                            {props.data?.parentName ?? "Canot find parent name"}
                        </Text>
                    </Group>
                    <TextInput
                        label="Type in the parent name for verifying"
                        icon={<IconPencil />}
                        ref={confirmRef}
                    />
                </>
            ),

            onConfirm: async () => {
                if (props.data?.parentName === confirmRef.current?.value) {
                    console.log("Deleted");
                    await DeleteDocument("xinphep", props.id);

                    navigate(staticLinkPaths.xinphepadmin, { replace: true });
                    return;
                }
                console.log("NOT DELETE");
            },

            labels: {
                confirm: "Delete",
                cancel: "Cancel",
            },
        });
    };

    return (
        <>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button>Response</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Response</Menu.Label>
                    <Menu.Item
                        icon={<IconCircleX />}
                        color={"red"}
                        onClick={() => responseHandle("Rejected")}
                    >
                        Mark Reject
                    </Menu.Item>

                    <Menu.Item
                        icon={<IconCheck />}
                        color={"green"}
                        onClick={() => responseHandle("Accepted")}
                    >
                        Mark Accept
                    </Menu.Item>

                    <Menu.Item
                        icon={<IconClock />}
                        onClick={() => responseHandle("Pending")}
                    >
                        Mark Pending
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Label color="red">Danger zone</Menu.Label>
                    <Menu.Item
                        color="red"
                        icon={<IconTrash />}
                        onClick={deleteHandle}
                    >
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}

interface AdminResponseBtnProps {
    id: string;
    data?: AskPermissionForm;
}
export default AdminResponseBtn;
