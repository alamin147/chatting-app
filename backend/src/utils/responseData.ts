import { Response } from "express";

export const sendResponse = async (
  res: Response,
  success: boolean,
  status: number,
  message: string,
  data?: any
) => {
  if (data) {
    return res.status(status).json({
      success,
      statusCode: status,
      message,
      data,
    });
  } else {
    return res.status(status).json({
      success,
      statusCode: status,
      message,
    });
  }
};
