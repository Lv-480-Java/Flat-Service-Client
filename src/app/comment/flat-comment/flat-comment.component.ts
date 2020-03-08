import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlatComment} from '../entity/FlatComment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-flat-comment',
  templateUrl: './flat-comment.component.html',
  styleUrls: ['./flat-comment.component.scss']
})
export class FlatCommentComponent implements OnInit {

  comments: FlatComment[] = [];
  data: any;
  text = '';

  @Input('id')  flatId: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    const c = 'http://localhost:8080/flatcomments/getall/' + this.flatId;
    this.http.get(c)
      .subscribe(data => {
        this.data = data;
        this.comments = this.data;
      });
    console.log(this.comments);
  }

  

  remove(id) {
    this.comments = this.comments.filter(item => item.id !== id);
  }

  add() {
    if (this.text.trim()) {
      const c: FlatComment = {
        text: this.text
      };
      this.text = '';
      this.comments.unshift(c);
    }
  }
}
