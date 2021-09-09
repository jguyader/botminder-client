import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { PostService } from '../@core/services/post.service';
import { Post } from '../@shared/models/post.model';
import { LikeService } from '../@core/services/like.service';
import { switchMapTo } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    public showCreatePost: boolean = false;
    public editedPostId: number = null;
    public posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
    public getPopular: boolean = false;
    private currentItemNb: number = 0;
    private readonly itemsPerLoad: number = 10;

    constructor(private readonly translate: TranslateService,
                private readonly postService: PostService,
                private readonly likeService: LikeService,
                private readonly snackBar: MatSnackBar) {
        this.getPosts();
    }

    public toggleCreatePost(): void {
        this.showCreatePost = !this.showCreatePost;
    }

    public hideCreatePost(created: boolean = false): void {
        this.toggleCreatePost();
        this.editedPostId = null;
        if (created) {
            this.getPosts(true);
        }
    }

    public onScroll(): void {
        this.getPosts();
    }

    public deletePost(post: Post): void {
        this.postService.delete(post.id).subscribe(
            () => {
                this.snackBar.open(this.translate.instant('post.delete.success'));
                this.getPosts(true);
            }
        );
    }

    public editPost(post: Post): void {
        this.editedPostId = post.id;
    }

    public likePost(postToUpdate: Post): void {
        this.likeService.post({ post: postToUpdate }).pipe(
            switchMapTo(this.postService.getOneById(postToUpdate.id))
        ).subscribe((updatedPost: Post) => {
            const previousPosts: Post[] = JSON.parse(JSON.stringify(this.posts$.getValue()));
            const updatedPostIndex: number = previousPosts.findIndex((p: Post) => p.id === updatedPost.id);
            previousPosts[updatedPostIndex] = updatedPost;
            this.posts$.next(previousPosts);
        });
    }

    public getPosts(reset: boolean = false) {
        if (reset) {
            this.currentItemNb = 0;
        }

        const params: HttpParams = new HttpParams().set('limit', this.itemsPerLoad)
            .set('offset', this.currentItemNb)
            .set('popular', this.getPopular);

        this.postService.get(params)
        .subscribe(
            (posts: Post[]) => {
                if (reset) {
                    this.posts$.next([]);
                }
                this.posts$.next([...this.posts$.getValue(), ...posts]);
                this.currentItemNb += this.itemsPerLoad;
            }
        );
    }
}
