import { Request, Response } from "express";
import fs from "fs";
import { FOLDER_ID } from "../constants";
import { drive } from "../services/GoogleApis";

const formidable = require("formidable-serverless");

export default class Controller {
    public static async uploadFile(req: Request, res: Response) {
        try {
            const form = new formidable.IncomingForm();

            form.parse(req, async (err: any, fields: any, files: any) => {
                if (err) {
                    res.status(400).json({
                        ...err,
                    });
                }

                const file = files.file;

                const createFile = await drive.files.create({
                    requestBody: {
                        name: file.name,
                        mimeType: file.type,
                        parents: [FOLDER_ID as string],
                    },
                    media: {
                        mimeType: file.type,
                        body: fs.createReadStream(file.path),
                    },
                });

                await drive.permissions.create({
                    fileId: createFile.data.id as string,
                    requestBody: {
                        role: "reader",
                        type: "anyone",
                    },
                });

                const image_link = `https://drive.google.com/uc?id=${createFile.data.id}`;

                res.status(200).json({
                    image_link,
                    file_id: createFile.data.id,
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}
