import { OpenModalWithCustomJSX } from "@/Helper/Modals/generalModals";
import { staticLinkPaths } from "@/data/staticPaths";
import { UnstyledButton, TextInput, Select, Button, Stack, Text, Avatar, Group, Autocomplete, Modal, Badge, Tooltip, Highlight, MediaQuery, ActionIcon } from "@mantine/core";
import { useDisclosure, useFocusTrap, useHotkeys, useMediaQuery, useToggle } from "@mantine/hooks";
import { IconSearch, IconTelescope } from "@tabler/icons";
import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { string } from "zod";


function SearchComps(props: SearchCompsProps) {
    const [opened, toggleOpened] = useToggle([false, true]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const focusTrapRef = useFocusTrap();

    useHotkeys([
        ['ctrl+space', () => toggleOpened()],
        ['cmd+space', () => toggleOpened()],

    ]);

    const SelectItem = forwardRef<HTMLDivElement, LinkProps>(
        ({ label, value, desc, icon, ...others }: LinkProps, ref) => (

            <div ref={ref} {...others}>
                <Group>
                    {icon}
                    <Highlight highlight={searchTerm} component={Text} size={"lg"} weight={700}>
                        {label}
                    </Highlight>
                </Group>
                <Text size={"md"}>{desc}</Text>

            </div >
        )
    );

    const handleSearchClicked = () => {
        toggleOpened();
    }


    return (
        <>
            <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                <Tooltip label={"Search"}>
                    <ActionIcon onClick={handleSearchClicked} style={{ cursor: "pointer" }} variant="filled">
                        <IconSearch />
                    </ActionIcon>
                </Tooltip>

            </MediaQuery>
            <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                <Tooltip label="Ctrl+Space for quick hotkeys">
                    <UnstyledButton onClick={handleSearchClicked} style={{ cursor: "pointer" }} >
                        <TextInput readOnly icon={<IconSearch />} placeholder={"Ctrl+Space for search"}
                        />
                    </UnstyledButton>
                </Tooltip>
            </MediaQuery>

            <Modal
                opened={opened}
                transition="fade"
                transitionDuration={200}
                transitionTimingFunction="ease"
                onClose={() => toggleOpened()}
                size={"xl"}
                title="What are you looking for "

            >
                <Select
                    data={props.actionsLinks ?? []}
                    itemComponent={SelectItem}
                    searchable
                    icon={<IconSearch />}
                    placeholder="What do you wanna do?"
                    data-autoFocus
                    autoFocus
                    ref={focusTrapRef}
                    nothingFound="NO ACTIONS"
                    onSearchChange={(v) => {
                        setSearchTerm(v);
                    }}
                    onChange={(v) => {
                        if (v ?? "" in Object.values(staticLinkPaths)) {
                            navigate(v ?? "./");
                            toggleOpened();
                        };
                    }}
                />
            </Modal>
        </>
    );
}

interface SearchCompsProps {
    actionsLinks?: LinkProps[]
}



export default SearchComps;