import { TestBed } from '@angular/core/testing';

import { ProfileRepository } from './profile.repository';

describe('ProfileRepository', () => {
  let repository: ProfileRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    repository = TestBed.inject(ProfileRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
