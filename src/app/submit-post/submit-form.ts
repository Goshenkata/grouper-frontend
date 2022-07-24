export class SubmitForm {
  constructor(
    public title: string,
    public image: File | null,
    public content: string,
    public groupName: string
  ) {
  }
}
