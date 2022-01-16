export class User {
  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  roleName: string = '';
  constructor(pass: string) {
    this.password = pass;
  }
}
