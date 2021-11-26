import { AssignDto } from "./../../models/assignDto";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-assign-detail-modal",
  templateUrl: "./assign-detail-modal.component.html",
  styleUrls: ["./assign-detail-modal.component.css"],
})
export class AssignDetailModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public assign: AssignDto) {}

  assignDto: AssignDto;
  ngOnInit(): void {
    this.assignDto = this.assign;
  }
}
