import { Group, Stack, TextInput, PasswordInput, Select, Grid, Table, Avatar } from "@mantine/core";
import { RegisterFormType } from "./RegisterPage";

function RegisterSummary({ data }: RegisterSummaryProps) {

    return (
        <>
            <Stack>
                <Group position="center" >
                    <Avatar src={data.refImage} size="xl" />
                </Group>
                <Grid >
                    <Grid.Col span={"auto"}>
                        <TextInput readOnly label="Name" value={data.CCCDName} />
                    </Grid.Col>
                    <Grid.Col span={"content"}><TextInput readOnly label="Phone Number" value={data.phoneNumber} /></Grid.Col>
                    <Grid.Col span={"content"}>
                        <Select readOnly data={["Male", "Female"]} value={data.genderCCCD} label="Gender" />
                    </Grid.Col>
                </Grid>
                <Group grow>
                    <TextInput readOnly label="Email" value={data.email} />
                    <TextInput readOnly label="CCCD/CMND" value={data.idCCCD} />

                </Group>
                <Stack spacing={"xs"}>
                    <PasswordInput readOnly label="Password" value={data.password} />
                    <PasswordInput readOnly label="Repeat Password" value={data.repeatPassword} />
                </Stack>

                <Table captionSide="top" striped highlightOnHover withBorder>
                    <caption>Student Datas</caption>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Student Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.parentOf.length > 0 && data.parentOf.map((v, i) => (
                            <tr key={v.name + i}>
                                <td>{v.name}</td>
                                <td>{v.class}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Stack >

        </>
    );
}

interface RegisterSummaryProps {
    data: RegisterFormType
}
export default RegisterSummary;