import { Book } from "./../../models/book";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-book-detail-modal",
  templateUrl: "./book-detail-modal.component.html",
  styleUrls: ["./book-detail-modal.component.css"],
})
export class BookDetailModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public book: Book) {}

  bookView: Book;
  ngOnInit(): void {
    this.bookView = this.book;
  }
}
