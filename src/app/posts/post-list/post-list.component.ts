import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

import { Post } from '../post.model';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
    posts: Post[] = [];
    private postsSub: Subscription; 

    constructor(public postService: PostsService){}

    ngOnInit() {
        this.posts = this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
        .subscribe((posts) => {
            this.posts = posts;
        });
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}