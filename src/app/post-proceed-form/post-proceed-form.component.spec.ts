import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProceedFormComponent } from './post-proceed-form.component';

describe('PostProceedFormComponent', () => {
  let component: PostProceedFormComponent;
  let fixture: ComponentFixture<PostProceedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostProceedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostProceedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
