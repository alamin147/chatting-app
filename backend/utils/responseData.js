export const sendResponse = async (res, success, status, message, data) => {
  if (data) {
    return res.status(status).json({
      success,
      message,
      data,
    });
  } else {
    return res.status(status).json({
      success,
      message,
    });
  }
};
