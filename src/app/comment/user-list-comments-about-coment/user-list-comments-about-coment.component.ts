import {Component, Input, OnInit} from '@angular/core';
import {UserComment, UserCommentService} from '../../services/user-comment.service';
import {ProfileService} from '../../services/profile.service';
import {Like, LikeService} from '../../services/like.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-list-comments-about-coment',
  templateUrl: './user-list-comments-about-coment.component.html',
  styleUrls: ['./user-list-comments-about-coment.component.scss']
})
export class UserListCommentsAboutComentComponent implements OnInit {
  isId: any = this.authService.isAuthenticated() ? this.profileService.getUserId().subscribe((id) => this.isId = id) : 0;
  isTrue = false;
  isList = false;
  isComplain = false;
  @Input() commentId: number;
  @Input() usersId: number;
  comments: UserComment[] = [];
  text = '';

  constructor(private userCommentService: UserCommentService,
              private profileService: ProfileService,
              private likeService: LikeService,
              private authService: AuthService) {
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

  addUser(id: number) {
    const like: Like = {
      userCommentId: id
    };
    this.likeService.addUser(like)
      .subscribe(comments => {
        this.ngOnInit();
      });
  }

  getUserRole() {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      return 'UNDERFINED';
    } else {
      return JSON.parse(localStorage.getItem('user')).role;
    }
  }

}
