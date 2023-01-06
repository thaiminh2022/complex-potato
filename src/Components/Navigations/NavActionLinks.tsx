import { Anchor, Group, ThemeIcon, Text, Stack } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function NavActionLinks(props: NavActionLinksProps) {

    const actionLinkMap = (item: LinkProps) => {

        return (
            <Link to={item.value} key={item.value} >
                <Group position="left" spacing={"xs"}>
                    {item.icon}
                    <Text weight={"bold"}>{item.label}</Text>
                </Group>
            </Link>
        )

    }

    return <>
        <Stack>
            {props.actionLinks && props.actionLinks.map(actionLinkMap)}
        </Stack>
    </>;
}

interface NavActionLinksProps {
    actionLinks: LinkProps[]
}
export default NavActionLinks;