import { Group, TextInput, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { RegisterFormType } from "../RegisterPage";

function RegisterCCCDInput({ form }: RegisterCCCDInputProps) {
    return (
        <>
            <Group grow>
                <TextInput
                    label="Full Name"
                    {...form.getInputProps("CCCDName")}
                />
                <Select
                    label="Gender"
                    data={["Male", "Female"]}
                    {...form.getInputProps("genderCCCD")}
                    dropdownPosition="bottom"
                    allowDeselect={false}
                />
            </Group>
            <TextInput
                label="Phone Number"
                type={"tel"}
                {...form.getInputProps("phoneNumber")}
            />
            <TextInput label="CCCD/CMND" {...form.getInputProps("idCCCD")} />
        </>
    );
}

interface RegisterCCCDInputProps {
    form: UseFormReturnType<RegisterFormType>;
}
export default RegisterCCCDInput;
