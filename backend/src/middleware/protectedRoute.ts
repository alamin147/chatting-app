import jwt, { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../utils/responseData";
import { StatusCodes } from "http-status-codes";
import User from "../auth/userModel/userModel";
import { Request, Response, NextFunction } from "express";
import { TUserInfo } from "../utils/tokenGenerator";

const protectedRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    // console.log("token", token);
    if (!token) {
      return sendResponse(
        res,
        false,
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access"
      );
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    const { userInfo } = decoded as JwtPayload & { userInfo: TUserInfo };
    if (!decoded) {
      return sendResponse(
        res,
        false,
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access"
      );
    }

    const user = await User.findOne({
      username: userInfo?.username,
    }).select("-password");
    // console.log("decoded", user);
    req.user = user;
    next();
  } catch (err: any) {
    return sendResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err?.message ? err.message : "Internal Server Error. Try again"
    );
  }
};

export default protectedRoutes;
