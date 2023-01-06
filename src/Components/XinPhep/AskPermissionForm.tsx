import { NumberInput, Textarea, TextInput, Group, Stack } from "@mantine/core";
import { useForm, UseFormReturnType, zodResolver } from "@mantine/form"
import { DatePicker } from "@mantine/dates";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { rawPermFormSchema } from "@/data/schemas";
import PermissionFormInputs from "./PermissionFormInputs";

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
            imgMatch: val?.imgMatch ?? 0,
        },
        // validate: zodResolver(rawPermFormSchema)
    })


    useEffect(() => {
        if (val)
            form.setValues(val);
    }, [val])

    return (
        <form onSubmit={form.onSubmit(props.onSubmit ?? (() => { }))} id={props.formId}>
            <PermissionFormInputs form={form} readonly={readonly} />
        </form>
    );
}

interface AskPermissionFormProps {
    readonly?: boolean,
    startValue?: RawAskPermissionForm
    formId?: string
    onSubmit?: (data: RawAskPermissionForm) => void | Promise<void>
}
export default AskPermissionForm;