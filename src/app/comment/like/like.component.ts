import {Component, Input, OnInit} from '@angular/core';
import {Like, LikeService} from '../../services/like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  constructor(private likeService: LikeService) {
  }

  ngOnInit(): void {
  }

  addFlat(id: number) {
    const like: Like = {
      flatCommentId: id
    };
    this.likeService.addFlat(like);
  }
  addUser(id: number) {
    const like: Like = {
      userCommentId: id
    };
    this.likeService.addUser(like);
  }
}
