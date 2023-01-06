import {
    Accordion,
    Button,
    Group,
    Select,
    Stack,
    Text,
    UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { ReactNode, useMemo } from "react";
import PermViewControl from "./PermViewControl";
import PermViewPanel from "./PermViewPanel";
import { staticLinkPaths } from "@/data/staticPaths";

function ViewPerms(props: ViewPermsProps) {
    const values = props.values;

    const filterForm = useForm<FilterForm>({
        initialValues: {
            date: undefined,
            status: "Pending",
        },
    });

    const filterValue = useMemo(() => {
        const dateFilter = filterForm.values.date?.toLocaleDateString();
        const statusFilter = filterForm.values.status;

        return values?.filter((v) => {
            const dateData = v.dateData.toLocaleDateString();
            const status = v.verified;

            const matchDate = dateData == (dateFilter ?? dateData);
            const matchStatus = status == (statusFilter ?? status);

            return matchDate && matchStatus;
        });
    }, [values, filterForm.values]);

    const userDataCard = (data: AskPermissionForm, index: number) => {
        return (
            <div key={data.id}>
                <Accordion.Item value={data.id ?? ""}>
                    <Accordion.Control>
                        <PermViewControl
                            verified={data.verified}
                            parentName={data.parentName}
                            studentName={data.studentName}
                            dateData={data.dateData}
                            to={`${props.to}/${data.id}`}
                        />
                    </Accordion.Control>
                    <Accordion.Panel>
                        <PermViewPanel
                            data={data}
                            rightSection={props.panelRightSection}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </div>
        );
    };

    return (
        <>
            <Stack spacing={"xs"}>
                <Group position="right" mb={"sm"} grow>
                    <DatePicker
                        label="Filter by Date"
                        {...filterForm.getInputProps("date")}
                    />
                    <Select
                        label="Filter by status"
                        {...filterForm.getInputProps("status")}
                        data={["Accepted", "Rejected", "Pending"]}
                        allowDeselect
                    />
                </Group>
                <Group position="right">
                    {filterForm.values.date == undefined &&
                    filterForm.values.status == undefined ? (
                        <></>
                    ) : (
                        <UnstyledButton
                            onClick={() => {
                                // Remove all filters
                                filterForm.setFieldValue("date", undefined);
                                filterForm.setFieldValue("status", undefined);
                            }}
                        >
                            <Text underline>Show all</Text>
                        </UnstyledButton>
                    )}
                </Group>
            </Stack>
            <Accordion multiple>
                {filterValue && filterValue.map(userDataCard)}
            </Accordion>
        </>
    );
}

interface ViewPermsProps {
    panelRightSection?: (data: AskPermissionForm) => ReactNode | ReactNode[];
    values: AskPermissionForm[];
    to: string;
}
type FilterForm = {
    date?: Date;
    status?: FormStatus;
};
export default ViewPerms;
