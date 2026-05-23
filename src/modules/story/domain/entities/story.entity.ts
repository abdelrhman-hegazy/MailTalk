export enum StoryType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export class Story {
  constructor(
    public userId: string,
    public type: StoryType,
    public mediaUrl: string | null,
    public text: string | null,
    public createdAt: Date,
    public expiresAt: Date,
  ) {}
}

export class CreateStoryDTO {
  constructor(
    public userId: string,
    public type: StoryType,
    public mediaUrl: string | null,
    public text: string | null,
  ) {}
}

export class StoryReturn {
  constructor(
    public id: string,
    public userId: string,
    public type: StoryType,
    public mediaUrl: string | null,
    public text: string | null,
    public createdAt: Date,
    public expiresAt: Date,
  ) {}
}

export class StoryView {
  constructor(
    public id: string,
    public storyId: string,
    public viewerId: string,
    public viewedAt: Date,
  ) {}
}
