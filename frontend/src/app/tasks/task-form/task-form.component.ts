import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() task: Task = this.getEmptyTask();
  @Output() saved = new EventEmitter<Partial<Task>>();
  @Output() canceled = new EventEmitter<void>();

  deadlineDate: Date | null = null;

  ngOnInit() {
    if (this.task && this.task.deadline) {
      this.deadlineDate = new Date(this.task.deadline);
    }
  }

  save() {
    const payload: Partial<Task> = { ...this.task };
    if (this.deadlineDate) {
      payload.deadline = this.deadlineDate.toISOString();
    }
    this.saved.emit(payload);

    // Reset form after saving (only if adding a new task, not editing)
    if (!this.task._id) {
      this.resetForm();
    }
  }

  cancel() {
    this.canceled.emit();
    this.resetForm();
  }

  /** Resets form to default empty task */
  private resetForm() {
    this.task = this.getEmptyTask();
    this.deadlineDate = null;
  }

  private getEmptyTask(): Task {
    return { title: '', description: '', priority: 'medium', completed: false };
  }
}
