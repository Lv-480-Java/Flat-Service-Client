import {Component, Input, OnInit} from '@angular/core';
import {Like, LikeService} from '../../services/like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  @Input() flatCommentId: number;
  like: Like[] = [];
  amount: number;

  constructor(private likeService: LikeService) {
  }

  ngOnInit(): void {
    this.loadComments(this.flatCommentId);
  }

  add() {
    const like: Like = {
      flatCommentId: this.flatCommentId
    };
    this.likeService.add(like);
  }

  loadComments(id: number): void {
    this.likeService.loadCommentsLike(id);
  }
}
