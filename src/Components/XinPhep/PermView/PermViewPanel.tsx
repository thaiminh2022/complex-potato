import React from "react";
import { Group, Stack, Text } from "@mantine/core"

function PermViewPanel({ rightSection, data }: PermViewPanelProps) {
  return (
    <Group position="apart">
      <Stack>
        <Text size={"md"} weight={"bold"}>Reasons: </Text>
        <Text>{data.reason}</Text>
      </Stack>
      {rightSection && rightSection(data)}
    </Group>
  )
}
interface PermViewPanelProps {
  rightSection?: (data: AskPermissionForm) => React.ReactNode | React.ReactNode[],
  data: AskPermissionForm,
}
export default PermViewPanel;
