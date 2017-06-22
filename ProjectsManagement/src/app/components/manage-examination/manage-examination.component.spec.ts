import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExaminationComponent } from './manage-examination.component';

describe('ManageExaminationComponent', () => {
  let component: ManageExaminationComponent;
  let fixture: ComponentFixture<ManageExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
