import {Component, Input, OnInit} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';
import {ProfileService} from '../../services/profile.service';
import {Like, LikeService} from '../../services/like.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {
  isId: any = this.profileService.getUserId().subscribe((id) => this.isId = id);
  role = JSON.parse(localStorage.getItem('user')).role;
  isTrue = false;
  isList = false;
  isComplain = false;
  @Input() commentId: number;
  @Input() flatId: number;
  comments: FlatComment[] = [];
  text = '';


  constructor(private flatCommentService: FlatCommentService,
              private profileService: ProfileService,
              private likeService: LikeService) {
  }

  ngOnInit(): void {
    this.loadComments(this.commentId);
  }

  remove(id: number) {
    this.flatCommentService.remove(id)
      .subscribe(() => {
        this.comments = this.comments.filter(item => item.id !== id);
      });
  }

  loadComments(id: number): void {
    this.flatCommentService.loadCommentsC(id)
      .subscribe(comments => {
        this.comments = comments.reverse();
      });

  }

  addFlat(id: number) {
    const like: Like = {
      flatCommentId: id
    };
    this.likeService.addFlat(like)
        .subscribe(flatComment => {
          this.ngOnInit();
        });
  }

}
