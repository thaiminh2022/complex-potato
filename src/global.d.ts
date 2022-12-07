export { }

declare global {

    // Permission form
    type AskPermissionForm = {
        id?: string,
        uid: string

        submitDate: Date,
        verified: "Accepted" | "Rejected" | "None"
        reasons: string,

    } & RawAskPermissionForm

    type RawAskPermissionForm = {
        parentName: string,
        parentPhoneNumber: string,
        studentName: string,

        grade: string,
        gradeIndex: string,


        studentIndex: number,

        reason: string,
        dateData: Date,

        imageStr64: string,
    }

    // Register Form
    type UserData = {
        id: string

        email: string,
        fullName: string,
        phoneNumber: string,

        refImage: string
        isAdmin: boolean
    }
}