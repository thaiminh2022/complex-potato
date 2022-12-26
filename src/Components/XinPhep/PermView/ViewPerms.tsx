import { Accordion, Group, Select, Stack, Text, Badge, Divider } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import React, { useMemo } from "react";
import PermViewCard from "./PermViewCard";
import PermViewControl from "./PermViewControl";
import PermViewPanel from "./PermViewPanel";
import { staticLinkPaths } from "@/data/staticPaths";


function ViewPerms(props: ViewPermsProps) {
    const values = props.values;

    const filterForm = useForm<FilterForm>({
        initialValues: {
            date: undefined,
            status: undefined
        }
    })

    const filterValue = useMemo(() => {
        const dateFilter = filterForm.values.date?.toLocaleDateString();
        const statusFilter = filterForm.values.status;

        return values?.filter(v => {
            const dateData = v.dateData.toLocaleDateString();
            const status = v.verified;

            const matchDate = dateData == (dateFilter ?? dateData);
            const matchStatus = status == (statusFilter ?? status);


            return matchDate && matchStatus;
        })


    }, [values, filterForm.values])

    const userDataCard = (data: AskPermissionForm, index: number) => {

        return <>
            <Accordion.Item value={data.id ?? ""} key={data.id + data.uid}>
                <Accordion.Control>
                    <PermViewControl
                        verified={data.verified}
                        parentName={data.parentName}
                        studentName={data.studentName}
                        dateData={data.dateData} to={`${staticLinkPaths.xinphepadmin}/${data.id}`} />
                </Accordion.Control>
                <Accordion.Panel>
                    <PermViewPanel reason={data.reason} />
                </Accordion.Panel>
            </Accordion.Item>
        </>
    }

    return <>
        <Group position="right" mb={"sm"} grow>
            <DatePicker label="Filter by Date" {...filterForm.getInputProps("date")} />
            <Select
                label="Filter by status"
                {...filterForm.getInputProps("status")}
                data={["Accepted", "Rejected", "Pending"]}
                allowDeselect
            />

        </Group>
        <Accordion multiple>
            {filterValue && filterValue.map(userDataCard)}
        </Accordion>
    </>
}

interface ViewPermsProps {
    values: AskPermissionForm[],
    to: string
}
type FilterForm = {
    date?: Date
    status?: FormStatus
}
export default ViewPerms;