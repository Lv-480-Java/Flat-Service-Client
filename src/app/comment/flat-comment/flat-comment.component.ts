import {Component, Input, OnInit} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';


@Component({
  selector: 'app-flat-comment',
  templateUrl: './flat-comment.component.html',
  styleUrls: ['./flat-comment.component.scss']
})
export class FlatCommentComponent implements OnInit {

  comments: FlatComment[] = [];

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
        this.comments = comments;
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
    if (this.text.trim()) {
      return;
    }
    const newFlatComment: FlatComment = {
      text: this.text,
      flatId: this.id
    };

    this.flatCommentService.add(newFlatComment)
      .subscribe(flatComment => {
        this.comments.unshift(flatComment)
        this.text = '';
      });
  }
}


