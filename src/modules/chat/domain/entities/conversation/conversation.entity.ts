export enum ConversationType {
  ONE_TO_ONE = "ONE_TO_ONE",
  GROUP = "GROUP",
}

export class Conversation {
  constructor(
    public readonly id: string,
    public readonly type: ConversationType,
    public readonly name?: string,
    public readonly imageUrl?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {
    if (type === ConversationType.GROUP && !name) {
      throw new Error("Group conversation must have a name");
    }
  }
  isGroup(): boolean {
    return this.type === ConversationType.GROUP;
  }
  isMember(): boolean {
    return this.type === ConversationType.ONE_TO_ONE;
  }
}
