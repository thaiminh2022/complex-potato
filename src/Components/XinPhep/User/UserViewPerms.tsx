import { permFormConverter } from "@/data/converters";
import { staticLinkPaths } from "@/data/staticPaths";
import { useDocsQuery } from "@/Helper/firebaseHelper";
import { Button, Divider, Stack, Group, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";


import { where } from "firebase/firestore";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import UserViewPermCard from "./UserViewPermCard";


function UserViewPerms(props: UserViewPermsProps) {
    const [values] = useDocsQuery("xinphep", permFormConverter, where("uid", "==", "hello"));

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
            <UserViewPermCard data={data} />
        </>
    }

    return (
        <>
            <Group position="apart" align={"center"}>

                <h1>View</h1>

                <Group>
                    <Link to={staticLinkPaths.xinphepmoi}>
                        <Button>Xin Phep Moi</Button>
                    </Link>
                    <Link to={staticLinkPaths.home}>
                        <Button variant="outline">Back</Button>
                    </Link>
                </Group>
            </Group>
            <Divider my={"sm"} />

            <Group position="right" mb={"sm"}>
                <DatePicker label="Filter by Date" {...filterForm.getInputProps("date")} />
                <Select
                    label="Filter by status"
                    {...filterForm.getInputProps("status")}
                    data={["Accepted", "Rejected", "Pending"]}
                />

            </Group>
            <Stack>
                {filterValue && filterValue.map(userDataCard)}
            </Stack>
        </>
    );
}

interface UserViewPermsProps {

}

type FilterForm = {
    date?: Date
    status?: FormStatus
}
export default UserViewPerms;