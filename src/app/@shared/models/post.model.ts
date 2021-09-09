import { User } from './user.model';
import { Like } from './like.model';

export class Post {
    public id: number;
    public author: User;
    public title: string;
    public content: string;
    public createdAt?: Date;
    public likes: Like[];
}
