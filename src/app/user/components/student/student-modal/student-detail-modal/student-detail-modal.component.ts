import { Student } from "./../../models/student";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-student-detail-modal",
  templateUrl: "./student-detail-modal.component.html",
  styleUrls: ["./student-detail-modal.component.css"],
})
export class StudentDetailModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public student: Student) {}

  studentView: Student;
  ngOnInit(): void {
    this.studentView = this.student;
  }
}