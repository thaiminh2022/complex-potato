import { LogoutAccount } from "@/Helper/firebaseHelper";
import { NewLoadingNotificationCallbacks } from "@/Helper/notifications/loadingNotification";
import { staticLinkPaths } from "@/data/staticPaths";
import { Button, Flex, Group, Loader, Stack, Text, Image, ScrollArea, Divider, ActionIcon, Anchor } from "@mantine/core";
import { IconCheck, IconRefresh } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";




function SignOut() {
    const [signedOut, setSignedOut] = useState(false);
    const [meme, setMeme] = useState<MemeType | null>(null);

    const handleSignOut = async () => {
        await NewLoadingNotificationCallbacks({
            titleStart: "Signing you out",
            messageStart: "See ya later bro",
            titleEnd: "Signed Out",
            messageEnd: "Goodbye!",

            errorTitle: "Oops",
            errorMessage: "Maybe you will have to stick with me for a few moment",

            callBack: async () => {
                await LogoutAccount();
            },
            onError: (e) => {
                console.log(e)
                setSignedOut(false)
            },

            onFinish: () => {
                setSignedOut(true)
            }


        })
    }
    const fetchImage = async () => {
        const api = await fetch("https://meme-api.com/gimme/1");
        const apiStr: MemeType = await api.json()

        setMeme(apiStr);
    }
    useEffect(() => {
        fetchImage();

    }, [])

    const signOutComponent = (
        <>
            <Group position="center" align={"center"}>
                <Stack>
                    <Text weight={"bold"} size="xl">Are you sure u wanna signed out?</Text>
                    <Button size="lg" variant="filled" onClick={handleSignOut}>Sign Out</Button>
                    <Divider my={"md"} />
                    <Group position="apart">
                        <Text weight={"bold"} size="lg">Here's a meme to keep u company</Text>
                        <ActionIcon onClick={fetchImage}>
                            <IconRefresh />
                        </ActionIcon>
                    </Group>
                    <ScrollArea style={{ height: "500px", width: "100%" }}>
                        <Image src={meme?.memes[0].url ?? ""} />
                        {meme &&
                            <Stack>
                                <Text>Image from: {meme.memes[0].subreddit}</Text>
                                <Anchor>URL: {meme.memes[0].postLink}</Anchor>
                            </Stack>
                        }
                    </ScrollArea>
                </Stack>
            </Group>
        </>
    )
    const signOutComponentOK = (
        <>
            <Group position="center" align={"center"} >
                <Stack>
                    <Group>
                        <Text weight={"bold"} size="lg">Signed Out</Text>
                        <IconCheck fontSize={16} />

                    </Group>
                    <Link to={staticLinkPaths.home}>
                        <Button>Back To Home</Button>
                    </Link>
                </Stack>

            </Group>
        </>
    )

    return (
        <>
            {signedOut ? signOutComponentOK : signOutComponent}
        </>
    );
}


export default SignOut;