export type NotificationProps = {
    id: string;
    title: string;
    message: string;
    onClose?: () => void;
    onOpen?: () => void;
};

export type NotificationCallbacks = {
    titleStart: string
    titleEnd: string

    messageStart: string
    messageEnd: string

    callBack: () => void | Promise<void>,
    onFinish?: () => void | Promise<void>,
    onError?: (error: any) => void | Promise<void>

    errorMessage?: string
    errorTitle?: string

}