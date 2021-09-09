import { Component, EventEmitter, Input, OnInit, Output }      from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar }                                         from '@angular/material/snack-bar';
import { TranslateService }                                    from '@ngx-translate/core';
import { PostService }                                         from '../../@core/services/post.service';
import { Post }                                                from '../../@shared/models/post.model';

@Component({
    selector   : 'app-create-post',
    templateUrl: './create-post.component.html'
})
export class CreatePostComponent implements OnInit {
    @Input()
    public post: Post;

    @Output()
    public hideCreatePost: EventEmitter<boolean> = new EventEmitter<boolean>();

    public form: FormGroup;

    constructor(private readonly fb: FormBuilder,
                private readonly translate: TranslateService,
                private readonly snackBar: MatSnackBar,
                private readonly postService: PostService) {
    }

    public get titleControl(): AbstractControl {
        return this.form.controls['title'];
    }

    public get contentControl(): AbstractControl {
        return this.form.controls['content'];
    }

    public ngOnInit(): void {
        this.form = this.fb.group({
            title  : [this.post?.title, Validators.required],
            content: [this.post?.content, Validators.required]
        });
    }

    public cancel(): void {
        this.hideCreatePost.emit(false);
    }

    public submit(): void {
        if (this.form.valid) {
            if (this.post?.id) {
                this.postService.put({ ...this.post, ...this.form.value }).subscribe(() => {
                    this.snackBar.open(this.translate.instant('post.edit.success'));
                    this.hideCreatePost.emit(true);
                });
            } else {
                this.postService.post(this.form.value).subscribe(() => {
                    this.snackBar.open(this.translate.instant('post.create.success'));
                    this.hideCreatePost.emit(true);
                });
            }
        }
    }
}
