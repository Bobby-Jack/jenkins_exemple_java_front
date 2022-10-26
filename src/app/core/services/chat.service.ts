import { Injectable } from '@angular/core';
import {CRUD, CrudConfig} from "./crud";
import {Chat} from "../models/chat.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const crud: CrudConfig = {
  path: 'rooms'
}

@Injectable({
  providedIn: 'root'
})
export class ChatService extends CRUD<Chat> {
  constructor(
    protected httpClient: HttpClient,
  )
  {
    super(httpClient, crud);
  }

  connect(id: number)
  {
    return this.httpClient.put<Chat>(`${environment.api.url}${crud.path}/${id}`, {});
  }

  disconnect(id: number)
  {
    return this.httpClient.put<Chat>(`${environment.api.url}${crud.path}${id}/leave`, {});
  }
}
