import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Complaint, ComplaintService} from '../../services/complaint.service';
import {UserComment} from '../../services/user-comment.service';

@Component({
  selector: 'app-complaint-u-c',
  templateUrl: './complaint-u-c.component.html',
  styleUrls: ['./complaint-u-c.component.scss']
})
export class ComplaintUCComponent implements OnInit {
  complaint: string;
  complaints: string[] = ['Unwanted commercial content', 'Harassment or bullying', 'Hate speech or violence', 'Spam'];

  @Input() commentId: number;
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter<void>();

  constructor(private complaintService: ComplaintService) {
  }

  ngOnInit(): void {
  }


  add() {
    const userComments: UserComment = {
      id: this.commentId
    };
    const complaint: Complaint = {
      text: this.complaint,
      userComment: userComments
    };
    this.complaintService.addComplaintUserComment(complaint)
      .subscribe(success => {
        this.complaintService.openSnackBar('Complaint sent', '');
      }, error => {
        this.complaintService.openSnackBar('The complaint has already been submitted', '');
      });
  }

}
