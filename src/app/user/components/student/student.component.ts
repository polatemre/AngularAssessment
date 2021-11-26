import { LookUpService } from "./../../../core/services/lookUp.service";
import { AlertifyService } from "./../../../core/services/alertify.service";
import { StudentService } from "./services/student.service";
import { AuthService } from "../../../core/components/admin/login/services/auth.service";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { LookUp } from "../../../core/models/lookUp";
import { Student } from "./models/student";
import { formatDate } from "@angular/common";
import { Book } from "../book/models/book";
import { BookDetailModalComponent } from "../book/book-modal/book-detail-modal/book-detail-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { StudentDetailModalComponent } from "./student-modal/student-detail-modal/student-detail-modal.component";

declare var jQuery: any;

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
})
export class StudentComponent implements  AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  studentList: Student[] = [];
  student: Student = new Student();

  studentAddForm: FormGroup;

  langugelookUp: LookUp[];
  displayedColumns: string[] = [
    "id",
    "name",
    "number",
    "birthDate",
    "gender",
    "update",
    "delete",
  ];
  dataSource: MatTableDataSource<any>;

  studentId: number;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private lookupService: LookUpService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.getStudentList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.lookupService.getLanguageLookup().subscribe((data) => {
      this.langugelookUp = data;
    });

    this.createStudentAddForm();
  }

  getStudentList() {
    this.studentService.getStudentList().subscribe((data) => {
      this.studentList = data;
      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    });
  }

  save() {
    if (this.studentAddForm.valid) {
      this.student = Object.assign({}, this.studentAddForm.value);

      if (this.student.id == 0) this.addStudent();
      else this.updateStudent();
    }
  }

  addStudent() {
    this.studentService.addStudent(this.student).subscribe((data) => {
      this.getStudentList();
      this.student = new Student();
      jQuery("#student").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.studentAddForm);
    });
  }

  updateStudent() {
    this.studentService.updateStudent(this.student).subscribe((data) => {
      var index = this.studentList.findIndex(
        (x) => x.id == this.student.id
      );
      this.studentList[index].name = this.student.name;
      this.studentList[index].surname = this.student.surname;
      this.studentList[index].number = this.student.number;
      this.studentList[index].birthDate = this.student.birthDate;
      this.studentList[index].gender = this.student.gender;
      this.dataSource = new MatTableDataSource(this.studentList);
      this.configDataTable();
      this.student = new Student();
      jQuery("#student").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.studentAddForm);
    });
  }

  createStudentAddForm() {
    this.studentAddForm = this.formBuilder.group({
      id: [0],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      number: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^[0-9]*$")]],
      birthDate: ["0001-01-01T00:00:00"],
      gender: [null]
    });
  }

  deleteStudent(studentId: number) {
    this.studentService.deleteStudent(studentId).subscribe((data) => {
      this.alertifyService.success(data.toString());
      this.studentList = this.studentList.filter(
        (x) => x.id != studentId
      );
      this.dataSource = new MatTableDataSource(this.studentList);
      this.configDataTable();
    });
  }

  openDetailModal(student: Student){
    this.dialog.open(StudentDetailModalComponent, {
      width:'400px',
      data: student 
    })
  }

  getStudentById(studentId: number) {
    this.clearFormGroup(this.studentAddForm);
    this.studentService.getStudent(studentId).subscribe((data) => {
      data.birthDate = formatDate(data.birthDate,'yyyy-MM-dd', 'en-US');
      data.birthDate = data.birthDate
      this.student = data;
      this.studentAddForm.patchValue(data);
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
