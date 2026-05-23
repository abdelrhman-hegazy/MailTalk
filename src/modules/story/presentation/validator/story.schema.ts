import zod from "zod";
import { StoryType } from "../../domain/entities/story.entity";

export const createStorySchema = zod.object({
  type: zod.enum(Object.values(StoryType)),
  mediaUrl: zod.string().optional(),
  text: zod.string().optional(),
});
