import { Group, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { ConfirmLabels } from "@mantine/modals/lib/context";
import { useRef } from "react";

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

export function OpenModalOneInput(props: OpenModalOneInputProps) {

    openConfirmModal({
        title: props.title ?? "Hey...",
        children: (
            <>
                <Group position="center">
                    <Stack>
                        <Text weight={"bold"} size="lg">{props.inputLabel}</Text>
                        <input
                            placeholder={props.placeHolder}
                            value={props.value}
                            onChange={e => props.setInput(e.target.value)}
                        />
                    </Stack>
                </Group>
            </>

        ),
        labels: props.labels,
        onCancel: props.onCancel,
        onConfirm: props.onConfirm,
    });
}





interface OpenModalWithCustomJSXProps {
    title?: string,
    children?: React.ReactNode | React.ReactNode[]
    labels?: ConfirmLabels,


    onCancel?: () => void | Promise<void>,
    onConfirm?: () => void | Promise<void>,

}


interface OpenModalOneInputProps {
    title?: string,
    inputLabel?: string
    placeHolder?: string
    labels?: ConfirmLabels
    setInput: React.Dispatch<React.SetStateAction<string>>
    value: string

    onCancel?: (input?: string) => void | Promise<void>,
    onConfirm?: (input?: string) => void | Promise<void>,

}