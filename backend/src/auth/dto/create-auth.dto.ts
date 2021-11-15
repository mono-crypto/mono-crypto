export class CreateAuthDto {
  google_id: string;
  email: string;
  name: string;
  picture: string;
  access_token?: string;
}
