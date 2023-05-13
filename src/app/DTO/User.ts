export class User {
  private username: string
  private password: string
  private email: string | undefined
  private re_password: string | undefined

  constructor(username: string, password: string, re_password?: string, email?: string) {
    this.username = username;
    this.password = password;
    this.re_password = re_password;
    this.email = email;
  }

  public getUsername(): string {
    return this.username;
  }

}
