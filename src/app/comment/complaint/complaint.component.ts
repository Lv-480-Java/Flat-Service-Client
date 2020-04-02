import {Component, Input, OnInit} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';
import {Complaint, ComplaintService} from '../../services/complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  text = '';

  @Input() commentId: number;

  constructor(private complaintService: ComplaintService) {
  }

  ngOnInit(): void {
  }


  add() {
    if (!this.text.trim()) {
      return;
    }
    const flatComments: FlatComment = {
      id: this.commentId
    };
    const complaint: Complaint = {
      text: this.text,
      flatComment: flatComments
    };
    this.complaintService.addComplaint(complaint)
      .subscribe(complain => {
        this.text = '';
      });
  }

}
