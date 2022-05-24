import { Component, Input, OnInit } from '@angular/core';

import { IUser } from '~/interfaces/user/IUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() user: IUser;
  @Input() isDoneTaskCount: number;
  @Input() likeCount: number;

  constructor() {}

  ngOnInit() {}
}
