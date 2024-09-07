import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(16);
  const hashPass = bcrypt.hash(password, salt);

  return hashPass;
};

export const comparePass = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
