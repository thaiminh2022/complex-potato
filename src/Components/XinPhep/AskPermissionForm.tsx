import { NumberInput, Textarea, TextInput, Group, Stack } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form"
import { DatePicker } from "@mantine/dates";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

const classCheckPattern = /^((10A)|(11B)|(12C))(\d[1-9])/i;

function AskPermissionForm(props: AskPermissionFormProps) {
    const readonly = props.readonly;
    const val = props.startValue;

    const form = useForm<RawAskPermissionForm>({
        initialValues: {
            parentName: val?.parentName ?? "",
            parentPhoneNumber: val?.parentPhoneNumber ?? "",
            studentName: val?.studentName ?? "",
            studentIndex: val?.studentIndex ?? 0,

            grade: val?.grade ?? "",

            reason: val?.reason ?? "",

            dateData: val?.dateData ?? new Date,
            imgStr: val?.imgStr ?? "",

        },

        validate: {
            grade: v => classCheckPattern.test(v) ? undefined : "Not correct format",
        }
    })




    return (
        <form onSubmit={form.onSubmit(props.onSubmit)} id={props.formID}>
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
        </form>
    );
}

interface AskPermissionFormProps {
    formID?: string,

    readonly?: boolean,
    onSubmit: (v: RawAskPermissionForm) => void
    startValue?: RawAskPermissionForm

}
export default AskPermissionForm;