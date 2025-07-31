import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  deadline?: string;   // ISO string
  priority: Priority;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private base = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(this.base);
  }

  create(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.base, task);
  }

  update(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.base}/${id}`, task);
  }

  delete(id: string): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.base}/${id}`);
  }
}
