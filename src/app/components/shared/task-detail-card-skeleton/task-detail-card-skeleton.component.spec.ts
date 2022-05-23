import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskDetailCardSkeletonComponent } from './task-detail-card-skeleton.component';

describe('TaskDetailCardSkeletonComponent', () => {
  let component: TaskDetailCardSkeletonComponent;
  let fixture: ComponentFixture<TaskDetailCardSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDetailCardSkeletonComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
