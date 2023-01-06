import { Container, Text, Card } from "@mantine/core";
import React from "react";

function RegisterDataInput(props: RegisterDataInputProps) {

    return (
        <>
            <Container size={"xs"}>
                <Text size={"xl"} weight="bold">
                    {props.title}
                </Text>
                <Card withBorder shadow={"md"}>
                    {props.children}
                </Card>
            </Container>
        </>
    )
}

interface RegisterDataInputProps {
    title?: string
    children?: React.ReactNode | React.ReactNode[]
}
export default RegisterDataInput;