import zod from "zod";

export const registerSchema = zod.object({
  email: zod.string().email(),
  name: zod.string().min(3),
  password: zod
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/,
    ),
});

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/,
    ),
});
