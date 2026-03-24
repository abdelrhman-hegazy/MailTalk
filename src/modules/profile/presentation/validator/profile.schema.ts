import zod from "zod";

export const updateProfileSchema = zod.object({
  bio: zod.string().optional(),
  name: zod.string().optional(),
});
