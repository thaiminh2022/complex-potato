import { Group, NumberInput, Stack, TextInput, Textarea } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import React from "react";

function PermissionFormInputs(props: PermissionFormInputsProps) {
    const form = props.form;
    const readonly = props.readonly;
    return (
        <>
            <Group grow>
                <TextInput label="Parents Name" required readOnly={readonly} {...form.getInputProps("parentName")} />
                <TextInput label="Parents Phone"
                    required
                    readOnly={readonly}
                    {...form.getInputProps("parentPhoneNumber")}
                    type="tel" />
            </Group>

            <Group position="apart" grow>
                <TextInput label="Student Name" required readOnly={readonly} {...form.getInputProps("studentName")} />
                <NumberInput label="Student Index" required min={0} readOnly={readonly} {...form.getInputProps("studentIndex")} />
                <TextInput label="Class"
                    required
                    placeholder="Enter class, eg: 11B04, 10b12"
                    readOnly={readonly}
                    {...form.getInputProps("grade")}
                />
            </Group>

            <Stack>
                <Textarea label="Reason" minRows={10} readOnly={readonly} {...form.getInputProps("reason")} required />
                <Group position={"right"}>
                    <p>Perm time: </p>
                    <DatePicker {...form.getInputProps("dateData")} required disabled={readonly} />
                </Group>
            </Stack>
        </>
    );
}

interface PermissionFormInputsProps {
    readonly?: boolean,
    form: UseFormReturnType<RawAskPermissionForm>
}
export default PermissionFormInputs;