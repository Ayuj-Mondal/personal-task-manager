import { Component } from '@angular/core';
import { Task, TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: Task[] = [];
  editingTask: Task | null = null;
  filterPriority = '';
  defaultTask: Task = { title: '', priority: 'medium', completed: false };

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.taskService.get().subscribe(tasks => this.tasks = tasks);
  }

  filteredTasks() {
    return this.tasks.filter(t => !this.filterPriority || t.priority === this.filterPriority);
  }

  onSave(task: Partial<Task>) {
    if (this.editingTask?._id) {
      this.taskService.update(this.editingTask._id, task).subscribe(() => {
        this.editingTask = null;
        this.load();
      });
    } else {
      this.taskService.create(task).subscribe(() => this.load());
    }
  }

  onCancel() {
    this.editingTask = null;
  }

  edit(t: Task) {
    this.editingTask = { ...t };
  }

  remove(t: Task) {
    if (confirm('Delete task?')) {
      this.taskService.delete(t._id!).subscribe(() => this.load());
    }
  }

  toggleCompleted(t: Task) {
    this.taskService.update(t._id!, { completed: !t.completed, priority: t.priority })
      .subscribe(() => this.load());
  }

}
