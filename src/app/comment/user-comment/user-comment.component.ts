import {Component, Input, OnInit} from '@angular/core';
import {UserComment, UserCommentService} from '../../services/user-comment.service';
import {ProfileService} from '../../services/profile.service';
import {Like, LikeService} from '../../services/like.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss']
})
export class UserCommentComponent implements OnInit {

  comments: UserComment[] = [];
  isId: any = this.authService.isAuthenticated() ? this.profileService.getUserId().subscribe((id) => this.isId = id) : 0;
  commentId: number;
  isTrue = false;
  isList = false;
  isComplain = false;
  text = '';
  @Input() id: number;
  load = 'new';

  constructor(private userCommentService: UserCommentService,
              private profileService: ProfileService,
              private likeService: LikeService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.load === 'new') {
      this.loadComments(this.id);
    }
    if (this.load === 'old') {
      this.loadCommentsOlder(this.id);
    }
    if (this.load === 'like') {
      this.loadCommentsByLikes(this.id);
    }
  }

  loadComments(id: number): void {
    this.userCommentService.loadComments(id)
      .subscribe(comments => {
        this.comments = comments.reverse();
      });
    console.log(this.comments);
  }

  loadCommentsByLikes(id: number): void {
    this.userCommentService.loadCommentsByLikes(id)
      .subscribe(comments => {
        this.comments = comments;
      });
    console.log(this.comments);

  }

  loadCommentsOlder(id: number): void {
    this.userCommentService.loadComments(id)
      .subscribe(comments => {
        this.comments = comments;
      });
    console.log(this.comments);

  }


  remove(id: number) {
    this.userCommentService.remove(id)
      .subscribe(() => {
        this.comments = this.comments.filter(item => item.id !== id);
      });
  }

  add() {
    if (!this.text.trim()) {
      return;
    }
    const newUserComment: UserComment = {
      text: this.text,
      userId: this.id
    };


    this.userCommentService.add(newUserComment)
      .subscribe(userComment => {
        this.text = '';
        this.loadData();
      });
  }

  addUser(id: number) {
    const like: Like = {
      userCommentId: id
    };
    this.likeService.addUser(like)
      .subscribe(comments => {
        this.loadData();
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
