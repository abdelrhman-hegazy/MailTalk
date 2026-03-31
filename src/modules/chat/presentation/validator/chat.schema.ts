import { ConversationMemberRole } from "../../domain/entities/conversation/conversationMember.entity";
import zod from "zod";

export const createGroupSchema = zod.object({
  imageUrl: zod.string().optional(),
  name: zod.string().min(3),
  members: zod.array(
    zod.object({
      userId: zod.string(),
      role: zod.enum([
        ConversationMemberRole.ADMIN,
        ConversationMemberRole.MEMBER,
      ]),
    }),
  ),
});
