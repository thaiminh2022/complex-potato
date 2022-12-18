export { }

declare global {

    type Gender = "Male" | "Female"
    type FormStatus = "Accepted" | "Rejected" | "Pending"
    type Student = {
        name: string,
        class: string
    }

    // Permission form
    type AskPermissionForm = {
        id?: string,
        uid: string

        submitDate: Date,
        verified: FormStatus
        verifiedReasons: string,

    } & RawAskPermissionForm

    type RawAskPermissionForm = {
        parentName: string,
        parentPhoneNumber: string,
        studentName: string,
        grade: string,

        studentIndex: number,

        reason: string,
        dateData: Date,

        imgStr: string,
    }

    // Register Form
    type UserData = {
        id?: string

        createdDate: Date
        isAdmin: boolean
    } & RawUserData
    type RawUserData = {
        // CCCD data
        email: string,
        CCCDName: string,
        genderCCCD: Gender
        phoneNumber: string,
        idCCCD: string

        // May or may not 
        parentOf: Student[]

        refImage: string
        refMatcher: string
    }

}