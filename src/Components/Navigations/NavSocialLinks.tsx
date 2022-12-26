import { ActionIcon, Anchor, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function NavSocialLinks(props: NavSocialLinksProps) {

    const socialLinksMap = (item: LinkProps) => {

        return (
            <Anchor href={item.value} key={item.value} target="_blank" weight={"bold"}>
                <Group position="left" spacing={"xs"}>
                    <ThemeIcon color={item.color}>
                        {item.icon}
                    </ThemeIcon>
                    <Text color={""}>{item.label}</Text>
                </Group>
            </Anchor>
        )

    }

    return <>
        <Stack>
            {props.socialLinks && props.socialLinks.map(socialLinksMap)}
        </Stack>
    </>;
}

interface NavSocialLinksProps {
    socialLinks: LinkProps[]
}
export default NavSocialLinks;