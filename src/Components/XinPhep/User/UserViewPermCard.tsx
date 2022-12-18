import { staticLinkPaths } from "@/data/staticPaths";
import { Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
import { IconArrowIteration, IconEye, IconLoader, IconLoader2, IconLoader3, IconThumbDown, IconThumbUp } from "@tabler/icons";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

function UserViewPermCard({ data }: UserViewPermCardProps) {
    const badgeData = useMemo(() => {
        const iconSize = 16;

        if (data.verified == "Accepted") {
            return {
                color: "green", icon: < IconThumbUp size={iconSize} />
            }
        }
        else if (data.verified == "Rejected") {
            return {
                color: "red", icon: < IconThumbDown size={iconSize} />
            }
        }

        return {
            color: undefined, icon: < IconLoader3 size={iconSize} />
        }

    }, [data.verified])


    return (
        <Card shadow="sm" p="lg" radius="md" withBorder key={data.id}>
            <Group position="apart">
                <Stack>
                    <Group>
                        <Text>{`${data.parentName} -> ${data.studentName}`}</Text>
                        <Badge color={badgeData.color} leftSection={badgeData.icon} size={"lg"}>
                            {data.verified}
                        </Badge>
                    </Group>
                    <Text lineClamp={3}>{data.reason}</Text>

                </Stack>
                <Stack>
                    <Badge variant="dot" size="lg">{data.dateData.toLocaleDateString("vi-VN")}</Badge>
                    <Link to={`${staticLinkPaths.xinphep}/${data.id ?? ""}`}>
                        <Button variant="outline" leftIcon={<IconEye />}>View</Button>
                    </Link>
                </Stack>
            </Group>
        </Card>
    );
}

interface UserViewPermCardProps {
    data: AskPermissionForm
}
export default UserViewPermCard;