import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlatComment, FlatCommentService} from '../../services/flat-comment.service';
import { ComplaintId, ComplaintService} from '../../services/complaint.service';
import {Router} from '@angular/router';

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

  constructor(public complaintService: ComplaintService) {
  }

  ngOnInit(): void {
  }


  add() {
    const complaintId: ComplaintId = {
      text: this.complaint,
      flatCommentId: this.commentId
    };
    this.complaintService.addComplaintFlatComment(complaintId)
      .subscribe(success => {
      this.complaintService.openSnackBar('Complaint sent', '');
    }, error => {
      this.complaintService.openSnackBar('The complaint has already been submitted', '');
    });
  }

}
