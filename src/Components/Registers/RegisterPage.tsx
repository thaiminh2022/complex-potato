import { Group, Stack, Button, Divider, Text, Stepper, TextInput, PasswordInput, Select } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { staticLinkPaths } from "../../data/staticPaths";
import { useCounter } from "@mantine/hooks";
import RegisterDataInput from "./RegisterDataInput";
import RegisterChild from "./RegisterChild";
import RegisterSummary from "./RegisterSummary";
import { IconBallon, IconCards, IconFaceId, IconLock } from "@tabler/icons";
import { CreateAccountAndPushToDB } from "@/Helper/firebaseHelper";
import { NewLoadingNotificationCallbacks } from "@/Helper/notifications/loadingNotification";
import { registerFormSchema } from "@/data/schemas";
import { useState } from "react";
import { useErrorState } from "@/Helper/hooks/useErrorState";



function RegisterPage() {
    const [step, setStep] = useCounter(0, { min: 0, max: 4 });
    const navigate = useNavigate();
    const form = useForm<RegisterFormType>({
        initialValues: {
            password: "",
            repeatPassword: "",
            email: "",
            CCCDName: "",
            genderCCCD: "Male",
            phoneNumber: "",
            idCCCD: "",

            // May or may not 
            parentOf: [{ name: "", class: "" }],

            refImage: "",
            refMatcher: "",
        },
        validate: zodResolver(registerFormSchema),
    });

    const passwordError = useErrorState("PASSWORD MUST MATCH", () => {
        const passwordMatch = form.values.password == form.values.repeatPassword;
        return passwordMatch
    }, [form.values.password, form.values.repeatPassword])


    const onStepChange = (decrement: boolean) => {
        if (decrement) {
            setStep.decrement();
            return
        }
        // Verify shits

        let isValid = false
        const validateField = form.validateField

        console.log(step)
        switch (step) {
            case 0:
                {
                    const validDatas: boolean[] = [
                        validateField("email").hasError,
                        validateField("password").hasError,
                        validateField("repeatPassword").hasError
                    ]
                    isValid = !validDatas.some(b => b);
                }

                break;
            case 1:
                {
                    const validDatas: boolean[] = [
                        validateField("CCCDName").hasError,
                        validateField("genderCCCD").hasError,
                        validateField("phoneNumber").hasError,
                        validateField("idCCCD").hasError
                    ]
                    isValid = !validDatas.some(b => b);
                }
                break;
            case 2:
                {
                    const result = validateField("parentOf")
                    if (result.hasError) {
                        alert(result.error!.toString())
                    }

                    isValid = !result.hasError;

                }
                break;

            default:
                console.log("Gone to default")
                isValid = true;
                break;
        }

        if (isValid) {
            console.log(isValid)
            setStep.increment();
        }
    }

    const onSubmit = async (data: RegisterFormType) => {
        const formResult = form.validate();

        if (formResult.hasErrors) {
            alert(formResult.errors);

            return;
        }

        const userDB: UserData = {
            email: data.email,
            CCCDName: data.CCCDName,
            genderCCCD: data.genderCCCD,
            phoneNumber: data.phoneNumber,
            idCCCD: data.idCCCD,
            parentOf: data.parentOf,
            refImage: data.refImage,
            refMatcher: data.refMatcher,

            createdDate: new Date(),
            isAdmin: false,
        };

        await NewLoadingNotificationCallbacks({
            titleStart: "Registering...",
            messageStart: "We are making some database real estate for u",

            titleEnd: "Register success!",
            messageEnd: "Your account now live in a new home",

            errorTitle: "Oops",
            errorMessage: "Seems like there's something wrong, try again later",
            callBack: async () => {
                await CreateAccountAndPushToDB(data.email, data.password, userDB);
            },
            onFinish: () => {
                navigate(staticLinkPaths.home, { replace: true })
            }
        })

    }


    return <>
        <Group position="apart" align={"center"}>
            <h1>Register</h1>
            <Group>
                <Link to={staticLinkPaths.home}>
                    <Button color={"red"} variant={"outline"}>Cancle</Button>
                </Link>
            </Group>
        </Group>
        <Divider my={"md"} />
        <form onSubmit={form.onSubmit(onSubmit)}>

            <Stepper active={step} onStepClick={v => setStep.set(v)} breakpoint="sm" size="lg">
                <Stepper.Step label="Email - Password" description="New account need some email and password" allowStepSelect={step > 0} icon={<IconLock />}>
                    <RegisterDataInput title="Email-Password">
                        <Stack>
                            <TextInput type="email" label="Email" {...form.getInputProps("email")} />
                            <PasswordInput
                                label="Password"  {...form.getInputProps("password")}
                                error={passwordError ?? form.getInputProps("password").error} />
                            <PasswordInput
                                label="Repeat Password" {...form.getInputProps("repeatPassword")}
                                error={passwordError ?? form.getInputProps("password").error} />
                        </Stack>
                    </RegisterDataInput>
                </Stepper.Step>
                <Stepper.Step label="ID Input" description="Input your ID card information" allowStepSelect={step > 1} icon={<IconCards />} >
                    <RegisterDataInput title="CCCD ID">
                        <Group grow>
                            <TextInput label="Full Name" {...form.getInputProps("CCCDName")} />
                            <Select label="Gender" data={["Male", "Female"]} {...form.getInputProps("genderCCCD")} dropdownPosition="bottom" allowDeselect={false} />
                        </Group>
                        <TextInput label="Phone Number" type={"tel"} {...form.getInputProps("phoneNumber")} />
                        <TextInput label="CCCD/CMND" {...form.getInputProps("idCCCD")} />
                    </RegisterDataInput>
                </Stepper.Step>

                <Stepper.Step label="Children" description="Input your children data" allowStepSelect={step > 2} icon={<IconBallon />}>
                    <RegisterDataInput title="Children">
                        <RegisterChild form={form} />
                    </RegisterDataInput>
                </Stepper.Step>

                <Stepper.Step label={"Face Verification"} description={"Let's capture an image of your face"} allowStepSelect={step > 3} icon={<IconFaceId />} >
                    <h1>Verified lol</h1>
                </Stepper.Step>
                <Stepper.Completed>
                    <Stack>
                        <Text weight={"bold"} size={"xl"}>Summary</Text>
                        <RegisterSummary data={form.values} />
                        <Button onClick={() => onSubmit(form.values)}>Submit</Button>
                    </Stack>
                </Stepper.Completed>
            </Stepper>

            <Divider my={"md"} />
            <Group position="right" mt={"md"}>
                <Button onClick={() => onStepChange(true)}>Back</Button>
                <Button onClick={() => onStepChange(false)}>Next</Button>
            </Group>
        </form>

    </>;
}


export type RegisterFormType = {
    password: string
    repeatPassword: string
} & RawUserData
export default RegisterPage;