export class Register {
  userName?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
  phone?: string;
  constructor(userName: string, phone: string, password: string) {
    this.userName = userName;
    this.phone = phone;
    this.password = password;
  }
}
