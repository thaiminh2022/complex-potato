import React from "react";
import { Text } from "@mantine/core"

function PermViewPanel({ ...data }: PermViewPanelProps) {
    return (
        <>
            <Text size={"md"} weight={"bold"}>Reasons: </Text>
            <Text>{data.reason}</Text>
        </>
    )
}
interface PermViewPanelProps {
    reason: string,
}
export default PermViewPanel;