import { ActionIcon, Avatar, Badge, Button, Divider, Group, Paper, ScrollArea, Stack, Text, UnstyledButton } from "@mantine/core";
import { Icon3dRotate, IconBrandFacebook, IconLogout, IconMouse, IconTriangle } from "@tabler/icons";
import NavSocialLinks from "./NavSocialLinks";
import { staticSocialLinks } from "@/data/socialPaths";
import NavActionLinks from "./NavActionLinks";
import { useUserData } from "@/Helper/hooks/useUserData";
import { Link } from "react-router-dom";
import { staticLinkPaths } from "@/data/staticPaths";

function NavbarContent(props: NavbarContentProps) {
    const { userData } = useUserData();
    return <>
        <ScrollArea>
            <Divider
                label={
                    <>
                        <Group spacing={"xs"}>
                            <IconTriangle />
                            <Text size={"sm"} weight={"bold"}>Extra Links</Text>
                        </Group>
                    </>
                }
                size={"sm"}
                labelPosition="center" />

            <NavSocialLinks socialLinks={staticSocialLinks} />

            <Divider label={
                <>
                    <Group spacing={"xs"}>
                        <IconMouse />
                        <Text size={"sm"} weight={"bold"}>Action Links</Text>
                    </Group>
                </>
            } size={"sm"} labelPosition="center" my={"md"} />

            <NavActionLinks actionLinks={props.navActionLinks} />
        </ScrollArea>

        <Stack mt={"auto"}>
            <Divider size={"md"} labelPosition="center" />
            <UnstyledButton>
                <Group spacing={"xs"} position="apart">
                    <Group>
                        <Avatar
                            radius={"md"}
                            src={userData?.refImage} size="lg">
                            {userData ? userData.CCCDName.slice(0, 2) : "DU69"}
                        </Avatar>

                        <Stack spacing={"xs"}>
                            <Text>{userData?.CCCDName ?? "Default User 69"}</Text>
                            <Badge>{userData?.isAdmin ? "Admin" : "Normal User"}</Badge>
                        </Stack>
                    </Group>
                    {
                        userData &&
                        <Group>
                            <Divider orientation="vertical" />
                            <Link to={staticLinkPaths.signOut}>
                                <ActionIcon >
                                    <IconLogout />
                                </ActionIcon>
                            </Link>
                        </Group>
                    }
                </Group>
            </UnstyledButton>
        </Stack>
    </>;
}

interface NavbarContentProps {
    navActionLinks: LinkProps[]
}
export default NavbarContent;