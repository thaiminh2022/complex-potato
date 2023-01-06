import { ActionIcon, Container, Flex, Group, MediaQuery, Text, TextInput, Tooltip, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { IconBooks, IconBrandDiscord, IconBrandGithub, IconClock, IconFlipVertical, IconMoon, IconSearch, IconSun } from "@tabler/icons";
import React from "react";
import SearchComps from "./SearchComps";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/fb";
import { staticLinkPaths, userLinksLogin, userLinksNotLogin } from "@/data/staticPaths";
import { Link } from "react-router-dom";

function HeaderContent(props: HeaderContentProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <>
            <Link to={staticLinkPaths.home} >
                <Group>
                    <IconBooks />
                    <Text weight={350} size={"lg"}>VTT PERM</Text>
                </Group>
            </Link>

            <Group ml={"auto"}>

                <SearchComps actionsLinks={props.userLinks} />

                <Tooltip label="Toggle dark mode">
                    <ActionIcon variant="subtle" onClick={() => toggleColorScheme()}>
                        {colorScheme == "dark" ? <IconMoon size={32} color={"yellow"} /> : <IconSun size={32} color={"black"} />}
                    </ActionIcon>
                </Tooltip>


            </Group>
        </>
    );
}



interface HeaderContentProps {
    userLinks: LinkProps[];
}

export default HeaderContent;





