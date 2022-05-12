import { TestBed } from '@angular/core/testing';

import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    repository = TestBed.inject(UserRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
