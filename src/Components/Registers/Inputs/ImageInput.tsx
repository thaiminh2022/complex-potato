import { Button, Modal } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { useState } from "react";
import WebcamComponent from "../Public/WebcamComponent";
import { RegisterFormType } from "./RegisterPage";

function ImageInput({ form, opened, setOpened }: ImageInputProps) {

    const onCapture = (data: () => string | null) => {

        return <Button variant="subtle" radius={"xl"} onClick={() => {
            const imageStr = data();

            if (imageStr) {
                form.setFieldValue("refImage", imageStr);
            }
        }}>
            Capture
        </Button>
    }

    return <div>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            size="auto"
        >
            <WebcamComponent capture={(data) => onCapture(data)} />
        </Modal>
    </div>;
}

interface ImageInputProps {
    form: UseFormReturnType<RegisterFormType>
    opened: boolean,
    setOpened: React.Dispatch<React.SetStateAction<boolean>>

}
export default ImageInput;