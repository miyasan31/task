import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.page.html',
  styleUrls: ['./tag-detail.page.scss'],
})
export class TagDetailPage implements OnInit {
  tagId: string;

  constructor(private route: ActivatedRoute, private navController: NavController) {}

  ngOnInit() {
    const subscribe = this.route.paramMap.subscribe((prams: ParamMap) => {
      this.tagId = prams.get('tagId');
    });
    subscribe.unsubscribe();
  }

  navigateBack(): void {
    this.navController.back();
  }
}
