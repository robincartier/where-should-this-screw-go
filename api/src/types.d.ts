import { Request } from "express";

declare global {

    type Base64 = `data:image/${string};base64${string}`;

    type DboPostStep = {
        rows: { id: number }[]
    }

    type DboGetStep = {
        rows: { 
            image: Buffer,
            tags: string,
            id: number
        }[]
    }

    export interface PostStepRequest extends Request {
        file: Express.Multer.File,
        body: { tags: string, id: number }
    }
}