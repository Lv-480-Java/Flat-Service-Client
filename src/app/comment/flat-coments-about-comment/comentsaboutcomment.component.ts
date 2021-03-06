import {Component, Input, OnInit} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';

@Component({
  selector: 'app-coments-about-comment',
  templateUrl: './comentsaboutcomment.component.html',
  styleUrls: ['./comentsaboutcomment.component.scss']
})
export class ComentsaboutcommentComponent implements OnInit {

  @Input() commentId: number;
  @Input() flatId: number;
  comments: FlatComment[] = [];
  text = '';
  constructor(private flatCommentService: FlatCommentService) {
  }

  ngOnInit(): void {

  }

  addC() {
    if (!this.text.trim()) {
      return;
    }
    const newFlatComment: FlatComment = {
      text: this.text,
      flatId: this.flatId,
      commentAboutComment: this.commentId
    };
    console.log();

    this.flatCommentService.addC(newFlatComment)
      .subscribe(flatComment => {
        this.text = '';
        this.comments = this.comments.concat(newFlatComment);
      });
  }

}
