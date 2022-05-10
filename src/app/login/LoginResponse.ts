export class LoginResponse{
  constructor(
    public access_token: string,
    public refresh_token: string,
    public expires_at: number,
    public username: string
  ) {
  }
}
