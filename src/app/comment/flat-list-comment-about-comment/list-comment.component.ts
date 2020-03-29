import {Component, Input, OnInit} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {
  isId: any = JSON.parse(localStorage.getItem('user')).userId;
  isTrue = false;
  isList = false;
  @Input() commentId: number;
  @Input() flatId: number;
  comments: FlatComment[] = [];
  text = '';



  constructor(private flatCommentService: FlatCommentService) {
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

}
