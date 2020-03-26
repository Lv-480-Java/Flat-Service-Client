import {Component, Input, OnInit} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';

@Component({
  selector: 'app-coments-about-comment',
  templateUrl: './comentsaboutcomment.component.html',
  styleUrls: ['./comentsaboutcomment.component.scss']
})
export class ComentsaboutcommentComponent implements OnInit {

  @Input() commentId: number;
  @Input() flatUserId: number;
  comments: FlatComment[] = [];
  text = '';
  constructor(private flatCommentService: FlatCommentService) {
  }

  ngOnInit(): void {
    this.loadComments(this.commentId);
  }

  addC() {
    if (!this.text.trim()) {
      return;
    }
    const newFlatComment: FlatComment = {
      text: this.text,
      flatId: this.flatUserId,
      commentAboutComment: this.commentId
    };
    console.log();

    this.flatCommentService.addC(newFlatComment)
      .subscribe(flatComment => {
        this.text = '';
        this.comments = this.comments.concat(newFlatComment);
        this.ngOnInit();
      });
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
    console.log(this.comments);
  }

}
