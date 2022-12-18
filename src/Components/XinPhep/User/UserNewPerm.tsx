import { Button, Divider, Group, Stack, Stepper, Text } from "@mantine/core";


import { Link, useNavigate } from "react-router-dom";
import AskPermissionForm from "../AskPermissionForm";
import { staticLinkPaths } from "@/data/staticPaths";
import UserSimilar from "./UserSimilar";
import { WriteDocument } from "@/Helper/firebaseHelper";
import { permFormConverter } from "@/data/converters";
import { useMemo, useState } from "react";
import { useUserData } from "@/Helper/hooks/useUserData";
import { NewLoadingNotificationCallbacks } from "@/Helper/notifications/loadingNotification";

// TODO: IMPLEMENT FACE CHECKING FOR USER

function UserNewPerm(props: UserNewPermProps) {
    const [active, setActive] = useState(0);
    const [submitActivate, setSubmitActivate] = useState(true);

    const navigate = useNavigate();

    const { userData, auth } = useUserData()!;

    const onSubmit = async (data: RawAskPermissionForm) => {
        setSubmitActivate(false)


        const formData: AskPermissionForm = {

            uid: auth?.uid ?? "hello",
            submitDate: new Date(),
            verified: "Pending",
            verifiedReasons: "",

            ...data
        }
        console.log(formData);

        await NewLoadingNotificationCallbacks({
            titleStart: "Submitting...",
            messageStart: "Looking for some nice place to put your submission",
            titleEnd: "Submitted...",
            messageEnd: "Your submission is at a nicer place now",

            errorTitle: "Cannot Submited",
            errorMessage: "Seems like we got some problems, try again later",

            callBack: async () => {
                await WriteDocument("xinphep", formData, permFormConverter);
            },
            onFinish: () => {
                navigate(staticLinkPaths.home, { replace: true });
            },
            onError: error => {
                setSubmitActivate(true)
                console.log(error)
            }

        })

    }

    const startValue = () => {
        if (!userData) {
            return undefined
        }

        const dummy: RawAskPermissionForm = {
            parentName: userData.CCCDName,
            parentPhoneNumber: userData.phoneNumber,
            studentName: userData.parentOf[0].name,
            grade: userData.parentOf[0].class,
            studentIndex: 0,
            reason: "",
            dateData: new Date(),
            imgStr: userData.refImage
        }

        return dummy
    }

    return <>
        <Stack spacing={"sm"}>
            <Group position="apart">
                <h1>Ask Permission Form</h1>
                <Link to={staticLinkPaths.xinphep}>
                    <Button variant="outline" color={"red"}>
                        Cancel
                    </Button>
                </Link>
            </Group>

            <Divider my={"md"} />

            <Stepper active={active} onStepClick={setActive} breakpoint="sm" size="lg">
                <Stepper.Step label="Input Data" description="Input data">
                    <AskPermissionForm onSubmit={onSubmit} formID={"new-form"} startValue={startValue()} />
                </Stepper.Step>
                <Stepper.Step label="Verify identity" description="Capture an image to verify">
                    <UserSimilar match={.3} />
                </Stepper.Step>
                <Stepper.Completed>
                    <Stack>
                        <Text>Thank You For Submit</Text>
                        <Button type="submit" form="new-form" fullWidth hidden={!submitActivate}>Submit</Button>

                    </Stack>
                </Stepper.Completed>
            </Stepper>
            <Group position="right">
                <Button variant="outline" onClick={() => setActive(prev => prev <= 0 ? prev : prev - 1)}>Back</Button>
                <Button variant="outline" onClick={() => setActive(prev => prev >= 2 ? prev : prev + 1)}>Next</Button>
            </Group>
        </Stack>
    </>;
}

interface UserNewPermProps {

}
export default UserNewPerm;

