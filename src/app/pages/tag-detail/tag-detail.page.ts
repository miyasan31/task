import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ITag } from '~/interfaces/tag/ITag';
import { ITiedTagTask } from '~/interfaces/timeline/ITiedTagTask';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { TagService } from '~/services/tag/tag.service';
import { TimelineService } from '~/services/timeline/timeline.service';
import { UserService } from '~/services/user/user.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.page.html',
  styleUrls: ['./tag-detail.page.scss'],
})
export class TagDetailPage implements OnInit {
  tagId: string;
  userId: string;
  tag: ITag;
  user: IUser;
  tiedTagTaskList: Observable<ITiedTagTask[]>;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private navController: NavController,
    private timelineService: TimelineService,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  async ngOnInit() {
    const subscribe = this.route.paramMap.subscribe((prams: ParamMap) => {
      this.userId = prams.get('userId');
      this.tagId = prams.get('tagId');
    });
    subscribe.unsubscribe();

    this.tag = await this.tagService.get(this.tagId);
    this.user = await this.userService.get(this.userId);

    const authUser = await this.authService.getAuthUser();

    setTimeout(() => {
      this.tiedTagTaskList = this.timelineService.getTiedTagTaskList(this.tagId, authUser.uid);
    }, 400);
  }

  navigateBack(): void {
    this.navController.back();
  }

  trackByFn(_, item: ITiedTagTask): string {
    return item.task.id;
  }
}
