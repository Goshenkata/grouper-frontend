export class RefreshPayload {
  constructor(
    public access_token: string,
    public refresh_token: string
  ) {
  }
}
