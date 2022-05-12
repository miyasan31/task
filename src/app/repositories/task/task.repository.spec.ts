import { TestBed } from '@angular/core/testing';

import { TaskRepository } from './task.repository';

describe('TaskService', () => {
  let repository: TaskRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    repository = TestBed.inject(TaskRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
