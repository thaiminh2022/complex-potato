export { }

declare global {

    // Permission form
    type AskPermissionForm = {
        id: string,
        uid: string

        submitDate: Date,
        isLocked: boolean
    } & RawAskPermissionForm

    type RawAskPermissionForm = {
        parentName: string,
        parentPhoneNumber: string,
        studentName: string,

        grade: string,
        gradeIndex: string,


        studentIndex: number,

        reason: string,
        dateData: Date | SubjectIndex,

        imageStr64: string,
    }

    type SubjectIndex = {
        subjectIndex: number,
        subject: string,
        date: Date
    }
}