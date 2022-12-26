import { openConfirmModal } from "@mantine/modals";
import { ConfirmLabels } from "@mantine/modals/lib/context";

export function OpenModalWithCustomJSX(props: OpenModalWithCustomJSXProps) {
    openConfirmModal({
        title: props.title ?? "Hey...",
        children: (
            props.children
        ),
        labels: props.labels,
        onCancel: props.onCancel,
        onConfirm: props.onConfirm,
    });
}





interface OpenModalWithCustomJSXProps {
    title?: string,
    children?: React.ReactNode | React.ReactNode[]
    labels?: ConfirmLabels

    onCancel?: () => void | Promise<void>,
    onConfirm?: () => void | Promise<void>,

}