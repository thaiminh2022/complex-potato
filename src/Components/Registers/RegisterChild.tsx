import { ActionIcon, Button, Divider, Flex, Grid, Group, ScrollArea, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconMinus, IconPlus } from "@tabler/icons";
import React from "react";
import { RegisterFormType } from "./RegisterPage";

const mockData: Student = {
    name: "",
    class: ""
}

function RegisterChild({ form }: RegisterChildProps) {

    const insertChild = () => {
        form.insertListItem("parentOf", mockData)
    }
    const deleteChild = (index?: number) => {
        if (index) {
            form.removeListItem("parentOf", index)
            return;
        }

        // Delete latest value
        form.removeListItem("parentOf", form.values.parentOf.length - 1)
    }
    const students = (item: Student, index: number) => {
        return (
            <>
                <Flex wrap={"wrap"} columnGap={"xl"}>
                    <TextInput {...form.getInputProps(`parentOf.${index}.name`)} label={"Student Name"} />
                    <TextInput {...form.getInputProps(`parentOf.${index}.class`)} label={"Student class"} />
                    <Button color={"red"} variant={"outline"} mt={"xl"} onClick={() => deleteChild(index)}>X</Button>
                </Flex>

                <Divider my={"sm"} size={"md"} color={"blue"} opacity={.5} />
            </>

        )
    }

    return (
        <>
            <ScrollArea style={{ height: "300px" }}>
                {form.values.parentOf.map(students)}
            </ScrollArea>
            <Divider my={"md"} />
            <Group position="right">
                <ActionIcon variant="outline" color="red" onClick={() => deleteChild()}>
                    <IconMinus color="red" />
                </ActionIcon>
                <ActionIcon variant="outline" color="blue" onClick={insertChild}>
                    <IconPlus color="blue" />
                </ActionIcon>
            </Group>

        </>

    )
}

interface RegisterChildProps {
    form: UseFormReturnType<RegisterFormType>
}
export default RegisterChild;