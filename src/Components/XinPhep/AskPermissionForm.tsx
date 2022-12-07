import { Button, NumberInput, Textarea, TextInput, Select, Image, Group, Stack, Flex, Avatar } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Modal } from '@mantine/core';
import { Link } from "react-router-dom";
import WebcamComponent from "../Public/WebcamComponent";

const classCheckPattern = /^((10A)|(11B)|(12C))(\d[1-9])/i;

function AskPermissionForm(props: AskPermissionFormProps) {

    const [opened, setOpened] = useState(false);
    const [classData, setClassData] = useState("");

    const readonly = props.readonly;
    const defaultData = props.startData;

    const form = useForm<RawAskPermissionForm>({
        initialValues: {
            parentName: defaultData?.parentName ?? "",
            parentPhoneNumber: defaultData?.parentName ?? "",
            studentName: defaultData?.studentName ?? "",
            studentIndex: defaultData?.studentIndex ?? 0,

            grade: defaultData?.grade ?? "",
            gradeIndex: defaultData?.gradeIndex ?? "",

            reason: defaultData?.reason ?? "",

            dateData: defaultData?.dateData ?? new Date,
            imageStr64: defaultData?.imageStr64 ?? ""
        },

        validate: {
            grade: v => v ? undefined : "Need some grade",
            gradeIndex: v => v ? undefined : "Need some grade",
            imageStr64: v => v ? undefined : "Wtf"
        }
    })

    const onCapture = (data: () => string | null) => {

        const onDataClick = () => {

            const finalData = data();
            console.log(finalData)
            form.setFieldValue("imageStr64", finalData ?? "");

            setOpened(false)
        }

        return (
            <>
                <Button type="button" onClick={() => onDataClick()}>CAPTURE AN IMAGE</Button>
            </>
        )
    }

    useEffect(() => {
        if (classData.length != 5 || !classCheckPattern.test(classData))
            return;

        //11b04
        const dummy = classData.trim();

        const grade = dummy.slice(0, 3);
        const gradeIndex = dummy.slice(3, 5);

        form.setFieldValue("grade", grade);
        form.setFieldValue("gradeIndex", gradeIndex);

    }, [classData])





    return (
        <form onSubmit={form.onSubmit(props.onSubmit)}>
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
                    value={classData}
                    onChange={e => setClassData(e.target.value)} />
            </Group>

            <Textarea label="Reason" minRows={10} readOnly={readonly} {...form.getInputProps("reason")} required />

            <div>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size="auto"
                >
                    <WebcamComponent capture={(data) => onCapture(data)} />
                </Modal>
            </div>

            <Group position="apart" mt={"md"}>
                <Group>
                    <Button variant="light" type="submit">Submit the form</Button>
                    <Button onClick={() => setOpened(true)}>Capture</Button>
                </Group>
                <Avatar src={form.values.imageStr64 ?? undefined} alt="parent-image" size={"xl"} radius="lg" />
            </Group>

        </form>
    );
}

interface AskPermissionFormProps {
    readonly?: boolean,
    onSubmit: (v: RawAskPermissionForm) => void

    startData?: RawAskPermissionForm,

}
export default AskPermissionForm;