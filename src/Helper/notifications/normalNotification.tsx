import { showNotification } from "@mantine/notifications";
import { NotificationProps } from "./NotificationProps";
import { IconNotification } from "@tabler/icons";

export function NewNotification(data: NotificationProps) {
    showNotification({
        title: data.title,
        message: data.message,
        icon: <IconNotification />,
        color: "grape",

        onOpen: data.onOpen,
        onClose: data.onClose,

    })
}

export function NewNotificationWithGoodBad(data: NotificationProps, isBad: boolean = false) {
    showNotification({
        title: data.title,
        message: data.message,
        icon: <IconNotification />,
        color: isBad ? "red" : "green",

        onOpen: data.onOpen,
        onClose: data.onClose,

    })
}