import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { ITag } from '~/interfaces/tag/ITag';
import { AuthService } from '~/services/auth/auth.service';
import { TagService } from '~/services/tag/tag.service';

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.scss'],
})
export class TagModalComponent implements OnInit {
  userId: string;
  tagList: ITag[];
  isVisible = true;

  constructor(
    private authService: AuthService,
    private tagService: TagService,
    private modalController: ModalController,
  ) {}

  async ngOnInit() {
    const user = await this.authService.getAuthUser();
    this.userId = user.uid;
    this.tagList = await this.tagService.getTagList(user.uid).pipe(first()).toPromise(Promise);
  }

  onModalDismiss(tag: ITag): void {
    this.modalController.dismiss(tag);
  }

  trackByFn(_, item: ITag): string {
    return item.id;
  }
}
