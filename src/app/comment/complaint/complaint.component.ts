import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';
import {Complaint, ComplaintService} from '../../services/complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  complaint: string;
  complaints: string[] = ['Unwanted commercial content', 'Harassment or bullying', 'Hate speech or violence', 'Spam'];

  @Input() commentId: number;
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter<void>()

  constructor(private complaintService: ComplaintService) {
  }

  ngOnInit(): void {
  }


  add() {
    const flatComments: FlatComment = {
      id: this.commentId
    };
    const complaint: Complaint = {
      text: this.complaint,
      flatComment: flatComments
    };
    this.complaintService.addComplaint(complaint)
      .subscribe(complain => {
        this.complaint = null;
      });
  }

}
