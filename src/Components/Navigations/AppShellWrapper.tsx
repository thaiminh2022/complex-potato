import { AppShell, Navbar, MediaQuery, Header, Burger, Text, useMantineTheme, Container, Transition } from "@mantine/core";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderContent from "./HeaderContent";
import NavbarContent from "./NavbarContent"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/fb";
import { useMediaQuery } from "@mantine/hooks";
import { staticLinkPaths, userLinksLogin, userLinksNotLogin } from "@/data/staticPaths";

function AppShellWrapper(props: AppShellWrapperProps) {
    const matches = useMediaQuery('(min-width: 768px)');

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [user, _, _1] = useAuthState(auth);

    const userLinks = useMemo(() => {
        return user ? userLinksLogin : userLinksNotLogin
    }, [user])

    const navUserLinks = useMemo(() => {
        if (!user) {
            return userLinks
        }

        // Filter out Sign out key
        return userLinks.filter(
            item =>
                [staticLinkPaths.signOut, staticLinkPaths.user]
                    .find(key => key == item.value) == null)

    }, [userLinks, user])

    return (
        <>
            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={


                    <Transition mounted={matches ? true : opened} transition="slide-right" duration={400} timingFunction="ease">
                        {(styles) => <Navbar
                            p="md"
                            // hiddenBreakpoint="sm"
                            // hidden={!opened}
                            width={{ sm: 300, lg: 300 }}
                            style={styles}
                        >

                            <NavbarContent navActionLinks={navUserLinks} />
                        </Navbar>}
                    </Transition>
                }

                header={
                    <Header height={{ base: 60 }} p="md" >
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>

                            <HeaderContent userLinks={userLinks} />
                        </div>
                    </Header>
                }
            >
                <Container >
                    <Outlet />
                </Container>
            </AppShell >

        </>
    );
}

interface AppShellWrapperProps {

}
export default AppShellWrapper;