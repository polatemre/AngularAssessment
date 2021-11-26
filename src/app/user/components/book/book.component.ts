import { AlertifyService } from "./../../../core/services/alertify.service";
import { BookService } from "./services/book.service";
import { AuthService } from "../../../core/components/admin/login/services/auth.service";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Book } from "./models/book";
import { MatDialog } from "@angular/material/dialog";
import { BookDetailModalComponent } from "./book-modal/book-detail-modal/book-detail-modal.component";

declare var jQuery: any;

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements  AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  bookList: Book[] = [];
  book: Book = new Book();

  bookAddForm: FormGroup;

  displayedColumns: string[] = [
    "id",
    "name",
    "type",
    "writer",
    "update",
    "delete",
  ];
  dataSource: MatTableDataSource<any>;

  bookId: number;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.getBookList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.createBookAddForm();
  }

  getBookList() {
    this.bookService.getBookList().subscribe((data) => {
      this.bookList = data;
      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    });
  }

  save() {
    if (this.bookAddForm.valid) {
      this.book = Object.assign({}, this.bookAddForm.value);

      if (this.book.id == 0) this.addBook();
      else this.updateBook();
    }
  }

  addBook() {
    this.bookService.addBook(this.book).subscribe((data) => {
      this.getBookList();
      this.book = new Book();
      jQuery("#book").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.bookAddForm);
    });
  }

  updateBook() {
    this.bookService.updateBook(this.book).subscribe((data) => {
      var index = this.bookList.findIndex(
        (x) => x.id == this.book.id
      );
      this.bookList[index].name = this.book.name;
      this.bookList[index].type = this.book.type;
      this.bookList[index].writer = this.book.writer;
      this.dataSource = new MatTableDataSource(this.bookList);
      this.configDataTable();
      this.book = new Book();
      jQuery("#book").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.bookAddForm);
    });
  }

  createBookAddForm() {
    this.bookAddForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      type: [''],
      writer: ['']
    });
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe((data) => {
      this.alertifyService.success(data.toString());
      this.bookList = this.bookList.filter(
        (x) => x.id != bookId
      );
      this.dataSource = new MatTableDataSource(this.bookList);
      this.configDataTable();
    });
  }

  getBookById(bookId: number) {
    this.clearFormGroup(this.bookAddForm);
    this.bookService.getBook(bookId).subscribe((data) => {
      this.book = data;
      this.bookAddForm.patchValue(data);
    });
  }


  openDetailModal(book: Book){
    this.dialog.open(BookDetailModalComponent, {
      width:'400px',
      data: book 
    })
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
