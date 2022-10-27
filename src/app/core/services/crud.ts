import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export abstract class CRUD<T>
{

  constructor(
    protected server: HttpClient,
    protected config: CrudConfig
  )
  {
  }

  public getAll()
  {
    return this.server.get<Array<T>>(`${environment.api.url}${this.config.path}`);
  }

  public getById(id: number)
  {
    return this.server.get<T>(`${environment.api.url}${this.config.path}/${id}`);
  }

  public insert(body: T)
  {
    return this.server.post<T>(`${environment.api.url}${this.config.path}`, body);
  }

  public update(id: number, body: T)
  {
    return this.server.put<T>(`${environment.api.url}${this.config.path}/${id}`, body);
  }

  public delete(id: number)
  {
    return this.server.delete<T>(`${environment.api.url}${this.config.path}/${id}`);
  }
}

export interface CrudConfig
{
  // /T /product ...
  path: string;
}
