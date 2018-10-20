import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksmanagementComponent } from './booksmanagement.component';

describe('BooksmanagementComponent', () => {
  let component: BooksmanagementComponent;
  let fixture: ComponentFixture<BooksmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
