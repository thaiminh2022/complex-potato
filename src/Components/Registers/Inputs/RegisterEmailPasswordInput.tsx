import { Stack, TextInput, PasswordInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { RegisterFormType } from "../RegisterPage";

function RegisterEmailPasswordInput({
    form,
    passwordError,
}: RegisterEmailPasswordInputProps) {
    return (
        <>
            <Stack>
                <TextInput
                    type="email"
                    label="Email"
                    {...form.getInputProps("email")}
                />
                <PasswordInput
                    label="Password"
                    {...form.getInputProps("password")}
                    error={
                        passwordError ?? form.getInputProps("password").error
                    }
                />
                <PasswordInput
                    label="Repeat Password"
                    {...form.getInputProps("repeatPassword")}
                    error={
                        passwordError ?? form.getInputProps("password").error
                    }
                />
            </Stack>
        </>
    );
}

interface RegisterEmailPasswordInputProps {
    form: UseFormReturnType<RegisterFormType>;
    passwordError?: string;
}
export default RegisterEmailPasswordInput;
