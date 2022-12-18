import { Badge, Group, Stack } from "@mantine/core";
import React from "react";

function UserSimilar(props: UserSimilarProps) {

    return (
        <>
            <Stack>
                <Group>
                    <p>Some image shit</p>
                    <Badge size="lg">
                        loading...
                    </Badge>
                </Group>

                <Badge color={(props.match < 0.6) ? "red" : "green"} variant="filled" size="lg">
                    Match: {props.match}
                </Badge>

            </Stack>
        </>
    );
}

interface UserSimilarProps {
    match: number
}
export default UserSimilar;