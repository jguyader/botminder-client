import { HttpClient }      from '@angular/common/http';
import { Injectable }      from '@angular/core';
import { Post }            from '../../@shared/models/post.model';
import { User }            from '../../@shared/models/user.model';
import { BaseHttpService } from './base-http-service.service';

@Injectable()
export class PostService extends BaseHttpService<Post> {
    protected readonly RESOURCE_URL = '/posts'

    constructor(http: HttpClient) {
        super(http);
    }
}
