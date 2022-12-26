import { z } from "zod"
import { permFormSchema, rawPermFormSchema, userSchema, rawUserSchema, studentSchema, statusEnum } from "./data/schemas"
import { MantineColor } from "@mantine/core"

export { }



declare global {

    // Permission form
    type AskPermissionForm = z.infer<typeof permFormSchema>
    type RawAskPermissionForm = z.infer<typeof rawPermFormSchema>

    // Register Form
    type UserData = z.infer<typeof userSchema>
    type RawUserData = z.infer<typeof rawUserSchema>

    type Student = z.infer<typeof studentSchema>
    type FormStatus = z.infer<typeof statusEnum>

    type LinkProps = {
        label: string,
        value: string,
        desc?: string,
        icon?: React.ReactNode
        color?: MantineColor
    }

    export type MemeType = {
        count: number;
        memes: Meme[];
    }

    export type Meme = {
        postLink: string;
        subreddit: string;
        title: string;
        url: string;
        nsfw: boolean;
        spoiler: boolean;
        author: string;
        ups: number;
        preview: string[];
    }

}

