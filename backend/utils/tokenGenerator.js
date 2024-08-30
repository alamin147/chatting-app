import jwt from "jsonwebtoken";

export const tokenGenerator = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    // httpOnly: true,
    // sameSite: "strict",
    // secure: true,
  });
};
