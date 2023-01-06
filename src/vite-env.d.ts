/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly APIKEY: string;
    readonly AUTHDOMAIN: string;
    readonly DATABASEURL: string;
    readonly VITE_PROJECTID: string;
    readonly STORANGEBUCKET: string;
    readonly MESSAGINGSENDERID: string;
    readonly APPID: string;
    readonly MEASUREMENTID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
