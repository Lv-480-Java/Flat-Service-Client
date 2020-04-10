import {Component, Input, OnInit} from '@angular/core';
import {UserComment, UserCommentService} from '../../services/user-comment.service';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-user-list-comments-about-coment',
  templateUrl: './user-list-comments-about-coment.component.html',
  styleUrls: ['./user-list-comments-about-coment.component.scss']
})
export class UserListCommentsAboutComentComponent implements OnInit {
  isId: any = this.profileService.getUserId().subscribe((id) => this.isId = id);
  isTrue = false;
  isList = false;
  isComplain = false;
  @Input() commentId: number;
  @Input() usersId: number;
  comments: UserComment[] = [];
  text = '';

  constructor(private userCommentService: UserCommentService,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.loadComments(this.commentId);
  }

  remove(id: number) {
    this.userCommentService.remove(id)
      .subscribe(() => {
        this.comments = this.comments.filter(item => item.id !== id);
      });
  }

  loadComments(id: number): void {
    this.userCommentService.loadCommentsC(id)
      .subscribe(comments => {
        this.comments = comments.reverse();
      });

  }

}
