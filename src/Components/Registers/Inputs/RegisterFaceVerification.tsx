import React, { useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { RegisterFormType } from "../RegisterPage";
import { Group, Divider, Text, ActionIcon, Image } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";
const FaceVerification = React.lazy(
    () => import("@/Components/Public/FaceVerification")
);

function RegisterFaceVerification({ form }: RegisterFaceVerificationProps) {
    const [captured, setCaptured] = useState(
        form.values.refImage && form.values.refMatcher ? true : false
    );

    const [previewImage, setPreviewImage] = useState<string | null>(
        form.values.refImage
    );

    return (
        <>
            <Group position="apart">
                <Text size={"xl"} weight={450}>
                    Take a picture for verification
                </Text>
                <ActionIcon
                    variant="subtle"
                    color="blue"
                    onClick={() => {
                        form.setFieldValue("refImage", "");
                        form.setFieldValue("refMatcher", "");

                        setPreviewImage(null);
                        setCaptured(false);
                    }}
                >
                    <IconRefresh />
                </ActionIcon>
            </Group>
            <Divider my={"md"} />

            {previewImage && captured ? (
                <Image src={previewImage} />
            ) : (
                <FaceVerification
                    width={"100%"}
                    height="100%"
                    onCapture={(data) => {
                        const screenshot = data.screenshot;
                        const faceMatcher = JSON.stringify(
                            data.faceMatcher.toJSON()
                        );

                        form.setFieldValue("refImage", screenshot ?? "");
                        form.setFieldValue("refMatcher", faceMatcher ?? "");

                        setPreviewImage(screenshot);
                        setCaptured(true);
                    }}
                    disable={captured}
                />
            )}
        </>
    );
}

interface RegisterFaceVerificationProps {
    form: UseFormReturnType<RegisterFormType>;
}
export default RegisterFaceVerification;
