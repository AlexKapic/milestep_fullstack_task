import { HttpMethod, ContentType } from '../common/enums';
import { http } from 'services/http.service';
import { ITask, ITaskCreate, ITasksRequest } from 'common/interfaces/task';

class TaskApi {
  private http = http;
  private BASE = '/api/tasks';

  public async createTask(payload: ITaskCreate): Promise<ITask[]> {
    return this.http.load(`${this.BASE}/create`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async getTasks(payload?: ITasksRequest): Promise<ITask[]> {
    return this.http.load(`${this.BASE}/`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async getTask(id: string): Promise<ITask> {
    return this.http.load(`${this.BASE}/${id}`, {});
  }

  public async deleteTask(id: string): Promise<ITask[]> {
    return this.http.load(`${this.BASE}/${id}`, {
      method: HttpMethod.DELETE,
    });
  }

  public async editTask(payload: {
    payload: ITaskCreate;
    id: string;
  }): Promise<ITask[]> {
    return this.http.load(`${this.BASE}/${payload.id}`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload.payload),
      contentType: ContentType.JSON,
    });
  }

  public async doneTask(payload: {
    isDone: boolean;
    id: string;
  }): Promise<ITask> {
    return this.http.load(`${this.BASE}/${payload.id}`, {
      method: HttpMethod.PATCH,
      payload: JSON.stringify(payload.isDone),
      contentType: ContentType.JSON,
    });
  }

  public async doneTasks(payload: { isDone: boolean }): Promise<ITask[]> {
    return this.http.load(`${this.BASE}/`, {
      method: HttpMethod.PATCH,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export const taskApi = new TaskApi();
