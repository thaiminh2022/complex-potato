import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { RegisterFormType } from "../RegisterPage";
const FaceVerification = React.lazy(
    () => import("@/Components/Public/FaceVerification")
);

function RegisterFaceVerification({ form }: RegisterFaceVerificationProps) {
    return (
        <>
            <FaceVerification
                width={"50%"}
                height="100%"
                onCapture={(data) => {
                    const screenshot = data.screenshot;
                    const faceMatcher = JSON.stringify(
                        data.faceMatcher.toJSON()
                    );

                    form.setFieldValue("refImage", screenshot ?? "");
                    form.setFieldValue("refMatcher", faceMatcher ?? "");
                }}
            />
        </>
    );
}

interface RegisterFaceVerificationProps {
    form: UseFormReturnType<RegisterFormType>;
}
export default RegisterFaceVerification;
