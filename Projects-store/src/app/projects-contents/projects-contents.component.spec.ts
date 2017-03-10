import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsContentsComponent } from './projects-contents.component';

describe('ProjectsContentsComponent', () => {
  let component: ProjectsContentsComponent;
  let fixture: ComponentFixture<ProjectsContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
