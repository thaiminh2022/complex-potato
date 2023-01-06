import { Group, Button, Divider, Tabs, Text } from "@mantine/core";
import { IconFile, IconPictureInPicture, IconPencil } from "@tabler/icons";
import React from "react";

function AdminNewAnnouncement(props: AdminNewAnnouncementProps) {
    return (
        <>
            <Group position="apart">
                <h1>New Announcement</h1>
                <Button variant="outline">Back</Button>
            </Group>

            <Divider />
            <Tabs defaultValue="files" title="Announcement Options">
                <Tabs.List>
                    <Tabs.Tab value="files" icon={<IconFile />}>
                        File
                    </Tabs.Tab>
                    <Tabs.Tab value="image" icon={<IconPictureInPicture />}>
                        Image
                    </Tabs.Tab>
                    <Tabs.Tab value="text" icon={<IconPencil />}>
                        Text
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="files" pt="xs">
                    Gallery tab content
                </Tabs.Panel>

                <Tabs.Panel value="image" pt="xs">
                    Messages tab content
                </Tabs.Panel>

                <Tabs.Panel value="text" pt="xs">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
        </>
    );
}

interface AdminNewAnnouncementProps {}
export default AdminNewAnnouncement;
