import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AgreementService} from "../../services/agreement.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-agreement-review',
  templateUrl: './agreement-review.component.html',
  styleUrls: ['./agreement-review.component.scss']
})
export class AgreementReviewComponent implements OnInit {

  template: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private http: HttpClient,
              private agreementService: AgreementService) {
  }

  ngOnInit(): void {
    this.loadAgreementTemplate();
  }

  loadAgreementTemplate() {
    this.agreementService.displayAgreement(this.data.requestId).subscribe(
      data => {
        this.template = data;
      }
    );
  }

}
