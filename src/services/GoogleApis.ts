import { google } from "googleapis";
import {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL,
    REFRESH_TOKEN,
    ACCESS_TOKEN,
} from "../constants/index";

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
    access_token: ACCESS_TOKEN,
});

export const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});
