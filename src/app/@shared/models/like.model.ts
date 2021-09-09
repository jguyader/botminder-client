import { User } from './user.model';
import { Post } from './post.model';

export class Like {
    public id: number;
    public user: User;
    public post: Post;
}
