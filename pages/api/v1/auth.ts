import { handle200, handle400, handle404 } from "@/lib/handler"

/* IMPORTANT */
/* --------------------
/* This page is only for checking if the user is human or not */

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const userToken = req.body.token;
    const response = await validateHuman(userToken);
    if (response != 200) {
        handle400(res, { message: "Please try again" })
    }

    handle200(res, { message: "Verified" })
};

const validateHuman = async (userToken): Promise<number> => {
    const res = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&res=${userToken}`,
        { method: "POST" }
    );

    return res.status;
};
