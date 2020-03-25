import {Component, Input, OnInit} from '@angular/core';
import {UserComment, UserCommentService} from '../../services/user-comment.service';


@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss']
})
export class UserCommentComponent implements OnInit {

  comments: UserComment[] = [];
  text = '';
  @Input() id: number;

  constructor(private userCommentService: UserCommentService) {
  }

  ngOnInit(): void {
    this.loadComments(this.id);
  }

  loadComments(id: number): void {
    this.userCommentService.loadComments(id)
      .subscribe(comments => {
        this.comments = comments.reverse();
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
        this.comments = this.comments.concat(newUserComment);
        this.ngOnInit();
      });
  }

}
