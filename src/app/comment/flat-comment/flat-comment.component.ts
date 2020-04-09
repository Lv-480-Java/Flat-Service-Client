import {Component, Input, OnInit} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';

@Component({
  selector: 'app-flat-comment',
  templateUrl: './flat-comment.component.html',
  styleUrls: ['./flat-comment.component.scss']
})
export class FlatCommentComponent implements OnInit {
  isId: any = JSON.parse(localStorage.getItem('user')).userId;
  comments: FlatComment[] = [];
  commentId: number;
  isTrue = false;
  isList = false;
  isComplain = false;
  text = '';
  @Input() id: number;

  constructor(private flatCommentService: FlatCommentService) {
  }

  ngOnInit(): void {
    this.loadComments(this.id);
  }

  loadComments(id: number): void {
    this.flatCommentService.loadComments(id)
      .subscribe(comments => {
        this.comments = comments.reverse();
      });
    console.log(this.comments);
  }


  remove(id: number) {
    this.flatCommentService.remove(id)
      .subscribe(() => {
        this.comments = this.comments.filter(item => item.id !== id);
      });
  }

  add() {
    if (!this.text.trim()) {
      return;
    }
    const newFlatComment: FlatComment = {
      text: this.text,
      flatId: this.id
    };
    console.log();

    this.flatCommentService.add(newFlatComment)
      .subscribe(flatComment => {
        this.text = '';
        this.comments = this.comments.concat(newFlatComment);
        this.ngOnInit();
      });
  }

}


