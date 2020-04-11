import {Component, Input, OnInit} from '@angular/core';
import {Complaint, ComplaintService} from '../../services/complaint.service';
import {UserComment} from '../../services/user-comment.service';

@Component({
  selector: 'app-complaint-u-c',
  templateUrl: './complaint-u-c.component.html',
  styleUrls: ['./complaint-u-c.component.scss']
})
export class ComplaintUCComponent implements OnInit {
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
    const userComments: UserComment = {
      id: this.commentId
    };
    const complaint: Complaint = {
      text: this.text,
      userComment: userComments
    };
    this.complaintService.addComplaint(complaint)
      .subscribe(complain => {
        this.text = '';
      });
  }

}
