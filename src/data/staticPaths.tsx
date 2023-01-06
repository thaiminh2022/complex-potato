import { iconSizes } from "@mantine/core/lib/Stepper/Step/Step.styles";
import { IconFilter, IconHome, IconLogin, IconLogout, IconMacro, IconNote, IconPencil, IconQuestionMark, IconRegistered, IconUser } from "@tabler/icons";

export const staticLinkPaths = {
    home: "/",
    xinphep: "/xinphep",
    xinphepmoi: "/xinphep/new",
    xinphepadmin: "/xinphep/admin",

    thongbao: "/thongbao",
    user: "/user",

    signOut: "/signout",


}

const mainLinksData: LinkProps[] = [
    {
        value: "/",
        label: "Home",
        desc: "Go to your homepage",
        icon: <IconHome />

    },
    {
        value: "/thongbao",
        label: "Announcements",
        desc: "Look for your announcements",
        icon: <IconNote />
    },
]
const userLinksLoginData: LinkProps[] =
    [

        {
            value: "/xinphep",
            label: "Permissions",
            desc: "Check all of your xinphep and its state",
            icon: <IconQuestionMark />
        },
        {
            value: "/xinphep/new",
            label: "New Perm",
            desc: "Write a new permission form",
            icon: <IconPencil />
        },
        {
            value: "/xinphep/admin",
            label: "Admin Permissions",
            desc: "Manager other people permission",
            icon: <IconFilter />
        },
        {
            value: "/user",
            label: "Account settings",
            desc: "Manage your accounts and different datas",
            icon: <IconUser />
        },
        {
            value: "/signout",
            label: "Sign Out",
            desc: "no pls",
            icon: <IconLogout />
        },


    ]

const userLinksNotLoginData: LinkProps[] =
    [
        {
            value: "/user/register",
            label: "Register",
            desc: "Be a new user with us to unlock all cool features",
            icon: <IconRegistered />

        },
        {
            value: "/user/login",
            label: "Login",
            desc: "Login to your account and get started",
            icon: <IconLogin />

        },
    ]

export const mainLinks = mainLinksData;
export const userLinksLogin = mainLinksData.concat(userLinksLoginData);
export const userLinksNotLogin = mainLinksData.concat(userLinksNotLoginData);


