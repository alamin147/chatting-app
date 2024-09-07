import jwt from "jsonwebtoken";
import { Response } from "express";

export type TUserInfo = {
  username: string | null | undefined;
  email: string | null | undefined;
  profilePic: string | null | undefined;
};

export const tokenGenerator = (userInfo: TUserInfo, res: Response) => {
  const token = jwt.sign({ userInfo }, process.env.TOKEN_SECRET as string, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    // secure: true,
  });
};
