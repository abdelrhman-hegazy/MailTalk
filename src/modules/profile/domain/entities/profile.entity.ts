export class Profile {
  constructor(
    public id: string,
    public userId: string,
    public avatarUrl: string | null,
    public bio: string | null,
    public lastSeen: Date,
    public isOnline: boolean,
    public createdAt: Date,
  ) {}
}
