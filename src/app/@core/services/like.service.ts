import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http-service.service';
import { Like } from '../../@shared/models/like.model';

@Injectable()
export class LikeService extends BaseHttpService<Like> {
    protected readonly RESOURCE_URL = '/likes';

    constructor(http: HttpClient) {
        super(http);
    }
}
