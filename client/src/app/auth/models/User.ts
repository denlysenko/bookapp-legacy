export interface User {
  _id?: string,
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  roles?: string[];
  reading?: { epubUrl: string, bookmark: string };
}
