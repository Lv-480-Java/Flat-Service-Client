import {Component, Input, OnInit} from '@angular/core';
import {UserComment, UserCommentService} from '../../services/user-comment.service';

@Component({
  selector: 'app-user-comments-about-coment',
  templateUrl: './user-comments-about-coment.component.html',
  styleUrls: ['./user-comments-about-coment.component.scss']
})
export class UserCommentsAboutComentComponent implements OnInit {
  @Input() commentId: number;
  @Input() userId: number;
  comments: UserComment[] = [];
  text = '';

  constructor(private userCommentService: UserCommentService) {
  }

  ngOnInit(): void {

  }

  addC() {
    if (!this.text.trim()) {
      return;
    }
    const newUserComment: UserComment = {
      text: this.text,
      userId: this.userId,
      commentAboutComment: this.commentId
    };
    console.log();

    this.userCommentService.addC(newUserComment)
      .subscribe(flatComment => {
        this.text = '';
        this.comments = this.comments.concat(newUserComment);
      });
  }


}
