import { Group, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { useMemo } from "react";
import { RegisterFormType } from "./RegisterPage";

function DataInputs({ form }: DataInputsProps) {
    const passwordError = useMemo(() => {

        if (form.values.password != form.values.repeatPassword) {
            return "Miss Match"
        }


        return undefined

    }, [form.values.password, form.values.repeatPassword])


    return <>
        <Group grow>
            <TextInput required label="Name" {...form.getInputProps("fullName")} type="text" />
            <TextInput required label="Phone Number" {...form.getInputProps("phoneNumber")} type="tel" />
        </Group>

        <TextInput required label="Email" {...form.getInputProps("email")} type="email" />

        <Group grow>
            <TextInput required label="Password" {...form.getInputProps("password")} type="password" error={passwordError} />
            <TextInput required label="Repeat your password" {...form.getInputProps("repeatPassword")} type="password" error={passwordError} />
        </Group>



    </>;
}

interface DataInputsProps {
    form: UseFormReturnType<RegisterFormType>
}
export default DataInputs;