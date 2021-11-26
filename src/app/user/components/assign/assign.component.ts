import { AssignDto } from './models/assignDto';
import { AssignDetailModalComponent } from './assign-modal/assign-detail-modal/assign-detail-modal.component';
import { Student } from "./../student/models/student";
import { BookService } from "./../book/services/book.service";
import { AlertifyService } from "./../../../core/services/alertify.service";
import { AssignService } from "./services/assign.service";
import { AuthService } from "../../../core/components/admin/login/services/auth.service";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { Assign } from "./models/assign";
import { formatDate } from "@angular/common";
import { StudentService } from "../student/services/student.service";
import { Book } from "../book/models/book";

declare var jQuery: any;

@Component({
  selector: "app-assign",
  templateUrl: "./assign.component.html",
  styleUrls: ["./assign.component.css"],
})
export class AssignComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  assignList: Assign[] = [];
  assign: Assign = new Assign();

  assignAddForm: FormGroup;

  bookList: Book[];
  studentList: Student[];

  selectedValue: string;

  displayedColumns: string[] = [
    "id",
    "bookName",
    "studentNumber",
    "studentName",
    "starTime",
    "remainingDay",
    "returnTime",
    "update",
    "delete",
  ];
  dataSource: MatTableDataSource<any>;

  assignId: number;

  constructor(
    private assignService: AssignService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private bookService: BookService,
    private studentService: StudentService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.getAssignList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.bookService.getBookList().subscribe((data) => {
      this.bookList = data;
    });

    this.studentService.getStudentList().subscribe((data) => {
      this.studentList = data;
    });

    this.createAssignAddForm();
  }

  getAssignList() {
    this.assignService.getAssignList().subscribe((data) => {
      this.assignList = data;
      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    });
  }

  save() {
    if (this.assignAddForm.valid) {
      this.assign = Object.assign({}, this.assignAddForm.value);

      if (this.assign.id == 0) this.addAssign();
      else this.updateAssign();
    }
  }

  addAssign() {
    this.assignService.addAssign(this.assign).subscribe((data) => {
      this.getAssignList();
      this.assign = new Assign();
      jQuery("#assign").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.assignAddForm);
    });
  }

  updateAssign() {
    this.assignService.updateAssign(this.assign).subscribe((data) => {
      var index = this.assignList.findIndex((x) => x.id == this.assign.id);
      this.assignList[index].bookId = this.assign.bookId;
      this.assignList[index].studentId = this.assign.studentId;
      this.assignList[index].startTime = this.assign.startTime;
      this.assignList[index].endTime = this.assign.endTime;
      this.assignList[index].isReturn = this.assign.isReturn;
      this.assignList[index].returneDateTime = this.assign.returneDateTime;
      this.dataSource = new MatTableDataSource(this.assignList);
      this.configDataTable();
      this.assign = new Assign();
      jQuery("#assign").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.assignAddForm);
    });
  }

  createAssignAddForm() {
    this.assignAddForm = this.formBuilder.group({
      id: [0],
      bookId: ["", Validators.required],
      studentId: ["", Validators.required],
      startTime: [formatDate(new Date(), "yyyy-MM-dd", "en-US"),Validators.required],
      endTime: ["0001-01-01T00:00:00"],
      isReturn: [null],
      returneDateTime: ["0001-01-01T00:00:00"],
    });
  }

  dateDiffInDays(endTime: string) {
    const diffTime = Math.abs(new Date(endTime).valueOf() - new Date().valueOf());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  openDetailModal(assign: AssignDto){
    this.dialog.open(AssignDetailModalComponent, {
      width:'400px',
      data: assign 
    })
  }

  deleteAssign(assignId: number) {
    this.assignService.deleteAssign(assignId).subscribe((data) => {
      this.alertifyService.success(data.toString());
      this.assignList = this.assignList.filter((x) => x.id != assignId);
      this.dataSource = new MatTableDataSource(this.assignList);
      this.configDataTable();
    });
  }

  getAssignById(assignId: number) {
    this.clearFormGroup(this.assignAddForm);
    this.assignService.getAssign(assignId).subscribe((data) => {
      data.startTime = formatDate(data.startTime, "yyyy-MM-dd", "en-US");
      data.endTime = formatDate(data.endTime, "yyyy-MM-dd", "en-US");
      data.returneDateTime = formatDate(data.returneDateTime, "yyyy-MM-dd", "en-US");
      this.assign = data;
      this.assignAddForm.patchValue(data);
    });
  }

  clearFormGroup(group: FormGroup) {
    group.markAsUntouched();
    group.reset();

    Object.keys(group.controls).forEach((key) => {
      group.get(key).setErrors(null);
      if (key == "id") group.get(key).setValue(0);
    });
  }

  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }

  configDataTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
