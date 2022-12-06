import { ActionIcon, Button, Divider, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { staticLinkPaths } from "../../data/staticPaths";

function LoginPage(props: LoginPageProps) {
    const form = useForm<LoginPageFormType>({
        initialValues: {
            email: "",
            password: ""
        },
        validate: {
            email: v => v ? undefined : "MUST INPUT AN EMAIL",
            password: v => v ? undefined : "MUST INPUT AN PASSWORD"
        }
    })

    const onSubmit = (data: LoginPageFormType) => {
        const result = form.validate();

        if (result.hasErrors) {
            console.log(result.errors)

            return;
        }
        console.log(data);
    }


    return <>
        <h1>Login</h1>
        <form>
            <Stack>
                <TextInput type="email" label="Your email" {...form.getInputProps("email")} />
                <TextInput type="password" label="Your password" {...form.getInputProps("password")} />
                <Button onClick={() => onSubmit(form.values)} type="button">
                    Login!
                </Button>
                <Link to={staticLinkPaths.home}>
                    <Button color={"red"} variant="subtle" type="button">Cancel</Button>
                </Link>

            </Stack>
            <Divider />
            <Group>
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


        </form>
    </>;
}

interface LoginPageProps {

}

type LoginPageFormType = {
    email: string,
    password: string,
}

export default LoginPage;