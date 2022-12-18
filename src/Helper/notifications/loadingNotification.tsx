import { showNotification, updateNotification } from "@mantine/notifications";
import { NotificationProps, NotificationCallbacks } from "./NotificationProps";
import { Title } from "@mantine/core";
import { v4 } from "uuid";
import { IconCheck, IconX } from "@tabler/icons";

export function NewLoadNotification(data: NotificationProps) {
    showNotification({
        id: data.id,
        disallowClose: true,
        title: data.title,
        message: data.message,
        loading: true,
        onOpen: data.onOpen,
        onClose: data.onClose,

    });
}
export function StopLoadNotification(data: NotificationProps, isBad: boolean = false) {
    updateNotification({
        id: data.id,
        disallowClose: true,
        title: data.title,
        message: data.message,
        loading: false,
        color: isBad ? "red" : "green",
        

        onOpen: data.onOpen,
        onClose: data.onClose,

        icon: isBad ? <IconX /> : <IconCheck />

    });
}

export async function NewLoadingNotificationCallbacks(data: NotificationCallbacks) {
    const id = v4();
    NewLoadNotification({ title: data.titleStart, message: data.messageStart, id: id })
    try {
        await data.callBack()
        if (data.onFinish) {
            await data.onFinish();
        }
        StopLoadNotification({ title: data.titleEnd, message: data.messageEnd, id: id })


    }
    catch (e: any) {
        if (data.onError) {
            await data.onError(e);
        }
        StopLoadNotification({ title: data.errorTitle ?? "Unexpected Error", message: data.errorMessage ?? "", id: id }, true)

    }
}


