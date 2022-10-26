import { Injectable } from '@angular/core';
import {CRUD, CrudConfig} from "./crud";
import {Chat} from "../models/chat.model";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

const crud: CrudConfig = {
  path: 'users'
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends CRUD<User> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, crud)
  }
}
