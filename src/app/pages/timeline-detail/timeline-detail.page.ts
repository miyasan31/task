import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '~/services/task/task.service';
import { Observable } from 'rxjs';
import { ITask } from '~/interfaces/ITask';

@Component({
  selector: 'app-timeline-detail',
  templateUrl: './timeline-detail.page.html',
  styleUrls: ['./timeline-detail.page.scss'],
})
export class TimelineDetailPage implements OnInit {
  userId: string;
  taskList: Observable<ITask[]>;

  constructor(public route: ActivatedRoute, public taskService: TaskService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((prams: ParamMap) => {
      this.userId = prams.get('userId');
    });
    this.taskList = this.taskService.getTaskList(this.userId);
  }
}
