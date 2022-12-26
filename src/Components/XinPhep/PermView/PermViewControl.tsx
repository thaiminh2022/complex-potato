import { Group, Stack, Badge, Button, Text } from "@mantine/core";
import { IconEye, IconLoader3, IconThumbDown, IconThumbUp } from "@tabler/icons";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

function PermViewControl({ verified, ...data }: PermViewControlProps) {

    const badgeData = useMemo(() => {
        const iconSize = 16;

        if (verified == "Accepted") {
            return {
                color: "green", icon: < IconThumbUp size={iconSize} />
            }
        }
        else if (verified == "Rejected") {
            return {
                color: "red", icon: < IconThumbDown size={iconSize} />
            }
        }

        return {
            color: undefined, icon: < IconLoader3 size={iconSize} />
        }

    }, [verified])
    return (
        <>
            <Group position="apart">
                <Group>
                    <Text>{`${data.parentName} -> ${data.studentName}`}</Text>
                    <Badge color={badgeData.color} leftSection={badgeData.icon} size={"lg"}>
                        {verified}
                    </Badge>
                </Group>
                <Group>

                    <Badge variant="dot" size="lg">{data.dateData.toLocaleDateString()}</Badge>
                    <Link to={data.to}>
                        <Button variant="outline" leftIcon={<IconEye />}>View</Button>
                    </Link>
                </Group>
            </Group>
        </>
    )
}

interface PermViewControlProps {
    verified: FormStatus
    parentName: string,
    studentName: string,
    dateData: Date,
    to: string,
}
export default PermViewControl;