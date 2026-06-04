export interface StoryViewReturn {
  id: string;
  storyId: string;
  viewerId: string;
  viewedAt: Date;
}

export class StoryView {
  constructor(
    public storyId: string,
    public viewerId: string,
    public viewedAt: Date,
  ) {}
}
