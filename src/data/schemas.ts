import { passwordStrength } from "check-password-strength";
import { z } from "zod";

export const classCheckPattern = /^((10A)|(11B)|(12C))(\d[1-9])/gi;
export const stringNumberPattern = /^\d+$/gi;

export const genderEnum = z.enum(["Male", "Female"]);
export const statusEnum = z.enum(["Accepted", "Rejected", "Pending"]);
export const importanceEnum = z.enum(["High", "Low", "Medium"]);
export const contentTypeEnum = z.enum(["Files", "Image", "Text"]);

export const studentSchema = z
    .object({
        name: z.string().min(1),
        class: z
            .string()
            .length(5)
            .regex(classCheckPattern, "Invalid, Example: 11B04, 10a05"),
    })
    .strict();

export const repeatPasswordStr = z.string().min(6, "password too short");
export const passwordStr = repeatPasswordStr.refine(
    (arg) => {
        const result = passwordStrength(arg);

        if (result.id < 1) {
            //password too weak
            return false;
        }

        return true;
    },
    (arg) => {
        return { message: "Password too weak" };
    }
);

// Form
export const rawPermFormSchema = z
    .object({
        parentName: z.string().min(1),
        parentPhoneNumber: z.string().min(9).max(12).regex(stringNumberPattern),
        studentName: z.string().min(1),
        grade: z.string().length(5).regex(classCheckPattern),

        studentIndex: z.number().min(1),

        reason: z.string(),
        dateData: z.date(),

        imgStr: z.string(),
        imgMatch: z.number().min(0.6, "Match too low"),
    })
    .strict();

export const permFormSchema = z
    .object({
        id: z.string().uuid().optional(),
        uid: z.string().uuid(),

        submitDate: z.date(),
        verified: statusEnum,
        verifiedReasons: z.string(),
    })
    .merge(rawPermFormSchema);

// User
export const rawUserSchema = z.object({
    email: z.string().email(),
    CCCDName: z.string(),
    genderCCCD: genderEnum,
    phoneNumber: z.string().min(9).max(12).regex(stringNumberPattern),
    idCCCD: z.string().min(10).max(12).regex(stringNumberPattern),

    // May or may not
    parentOf: z.array(studentSchema),

    refImage: z.string().min(1),
    refMatcher: z.string().min(1),
});

export const userSchema = z
    .object({
        id: z.string().optional(),

        createdDate: z.date(),
        isAdmin: z.boolean(),
    })
    .merge(rawUserSchema)
    .strict();

export const registerFormSchema = z
    .object({
        password: passwordStr,
        repeatPassword: repeatPasswordStr,
    })
    .merge(rawUserSchema);

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const rawAnnouncementSchema = z.object({
    title: z.string().min(1),
    importanceLevel: importanceEnum,
    contentType: contentTypeEnum,
    content: z.array(z.string().min(1)).nonempty(),
});

export const announcementSchema = z
    .object({
        id: z.string().min(1).optional(),
        submitDate: z.string().datetime(),
    })
    .merge(rawAnnouncementSchema)
    .strict();
