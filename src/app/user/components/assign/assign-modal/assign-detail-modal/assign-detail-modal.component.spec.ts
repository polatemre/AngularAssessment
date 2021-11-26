import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDetailModalComponent } from './assign-detail-modal.component';

describe('AssignDetailModalComponent', () => {
  let component: AssignDetailModalComponent;
  let fixture: ComponentFixture<AssignDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
