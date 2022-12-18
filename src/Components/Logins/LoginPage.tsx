import { NewLoadingNotificationCallbacks } from "@/Helper/notifications/loadingNotification";
import { staticLinkPaths } from "@/data/staticPaths";
import { LoginAccount } from "@/Helper/firebaseHelper";
import { Button, Card, Container, Divider, Group, Stack, TextInput, Text, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock, IconLogin, IconUser } from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
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

    const onSubmit = async (data: LoginPageFormType) => {
        const formResult = form.validate();

        if (formResult.hasErrors) {
            console.log(formResult.errors)

            return;
        }

        NewLoadingNotificationCallbacks({
            titleStart: "Looking for your land",
            messageStart: "We're searching for you land at our database",

            titleEnd: "Login success",
            messageEnd: "Nice land!",

            errorTitle: "Login failed",
            errorMessage: "Check your account again",

            callBack: async () => {
                await LoginAccount(data.email, data.password)
            },

            onFinish: async () => {
                navigate(staticLinkPaths.home, { replace: true })
            }
        })
    }


    return <>
        <Group position="apart">
            <h1>Login</h1>
            <Link to={staticLinkPaths.home}>
                <Button color={"red"} variant="subtle" type="button">Cancel</Button>
            </Link>
        </Group>
        <Divider my={"lg"} />

        <Container size={"xs"} >
            <Card withBorder shadow={"md"}>
                <Text weight={"bold"} size={"xl"}>User Data</Text>
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
                        <TextInput type="email" label="Your email" {...form.getInputProps("email")} placeholder="example@gmail.com" icon={<IconUser />} />

                        <PasswordInput label="Your password" {...form.getInputProps("password")} placeholder={"69420"} icon={<IconLock />} />

                    </Stack>
                    <Group position="right" my={"lg"}>
                        <Button type="submit" leftIcon={<IconLogin />}>Login</Button>
                    </Group>
                </form>
            </Card>
        </Container>

    </>;
}


type LoginPageFormType = {
    email: string,
    password: string,
}

export default LoginPage;