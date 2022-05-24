import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.page.html',
  styleUrls: ['./tag-detail.page.scss'],
})
export class TagDetailPage implements OnInit {
  tagId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const subscribe = this.route.paramMap.subscribe((prams: ParamMap) => {
      this.tagId = prams.get('tagId');
    });
    subscribe.unsubscribe();
  }
}
