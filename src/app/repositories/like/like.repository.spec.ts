import { TestBed } from '@angular/core/testing';

import { LikeRepository } from './like.repository';

describe('LikeRepository', () => {
  let repository: LikeRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    repository = TestBed.inject(LikeRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
