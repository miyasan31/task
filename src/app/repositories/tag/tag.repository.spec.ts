import { TestBed } from '@angular/core/testing';

import { TagRepository } from './tag.repository';

describe('TaskService', () => {
  let repository: TagRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    repository = TestBed.inject(TagRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
