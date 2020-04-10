import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';
import { ComplaintId, ComplaintService} from '../../services/complaint.service';

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
    const complaintId: ComplaintId = {
      text: this.complaint,
      flatCommentId: this.commentId
    };
    this.complaintService.addComplaint(complaintId)
      .subscribe(complain => {
        this.complaint = null;
      });
  }

}
