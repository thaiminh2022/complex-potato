import { Group, Stack, Image, Button, Divider, Text, UnstyledButton, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import DataInputs from "./DataInputs";
import ImageInput from "./ImageInput";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { validateArgCount } from "@firebase/util";
import { Link } from "react-router-dom";
import { staticLinkPaths } from "../../data/staticPaths";


function RegisterPage(props: RegisterPageProps) {
    const [open, setOpen] = useState(false);


    const form = useForm<RegisterFormType>({
        initialValues: {
            email: "",
            password: "",
            repeatPassword: "",

            phoneNumber: "",

            fullName: "",
            refImage: "",
        },
        validate: {
            password: (v, f) => (v && v === f.repeatPassword) ? undefined : "Miss Match",
            repeatPassword: (v, f) => (v && v === f.password) ? undefined : "Miss Match",

            refImage: (v) => v ? undefined : "NEED AN IMAGE",

            email: v => v ? undefined : "Need Email",
            phoneNumber: v => v ? undefined : "Need Phone Number",
            fullName: v => v ? undefined : "Need Name",


        },



    });

    const onSubmit = (data: RegisterFormType) => {
        const result = form.validate();

        if (result.hasErrors) {
            console.log(result.errors);

            return;
        }

        console.log(data)
    }


    return <>
        <h1>Register</h1>
        <form>
            <Stack>
                <DataInputs form={form} />
                <ImageInput form={form} opened={open} setOpened={setOpen} />

                <Divider size={"md"} />
                <Group grow>
                    <Group position="left">
                        <Stack>
                            <Text weight={700}>Reference Image</Text>
                            <Button onClick={() => setOpen(prev => !prev)} variant="outline">Capture Image</Button>
                        </Stack>
                        <Image src={form.values.refImage ?? undefined} width={"60%"} />
                    </Group>
                    <Group position="center" grow>
                        <Stack>
                            <Text align="center" weight={700}>Or Quick register with</Text>
                            <Group position="center">
                                <ActionIcon size={"lg"}>
                                    <FcGoogle color="red" size={"100%"} />
                                </ActionIcon>

                                <ActionIcon size={"lg"}>
                                    <FaGithub size={"100%"} color="black" />
                                </ActionIcon>

                                <ActionIcon size={"lg"}>
                                    <FaFacebook color="blue" size={"100%"} />
                                </ActionIcon>
                            </Group>
                        </Stack>
                    </Group>

                </Group>
                <Group position="apart">
                    <Group>
                        <Button type="button" onClick={() => onSubmit(form.values)}>Register!</Button>
                        <Link to={staticLinkPaths.home}>
                            <Button type="button" onClick={() => console.log(form.values)} color="red" variant="subtle">Cancel</Button>

                        </Link>
                    </Group>
                </Group>

            </Stack>
        </form>

    </>;
}

interface RegisterPageProps {

}

export type RegisterFormType = {
    email: string,
    password: string,
    repeatPassword: string,

    phoneNumber: string,

    fullName: string,
    refImage: string,
}
export default RegisterPage;