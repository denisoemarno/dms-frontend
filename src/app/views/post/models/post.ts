export interface Post {
  id: number;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
