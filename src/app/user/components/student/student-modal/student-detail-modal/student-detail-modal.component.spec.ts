import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailModalComponent } from './student-detail-modal.component';

describe('StudentDetailModalComponent', () => {
  let component: StudentDetailModalComponent;
  let fixture: ComponentFixture<StudentDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
