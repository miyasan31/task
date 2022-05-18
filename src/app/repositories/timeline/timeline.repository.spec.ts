import { TestBed } from '@angular/core/testing';

import { TimelineRepository } from './timeline.repository';

describe('TimelineRepository', () => {
  let repository: TimelineRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    repository = TestBed.inject(TimelineRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
