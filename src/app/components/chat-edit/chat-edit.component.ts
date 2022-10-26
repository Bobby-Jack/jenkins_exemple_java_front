import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../core/models/user.model";
import {UserRecovery} from "../../core/models/user-recovery";
import {Chat} from "../../core/models/chat.model";
import {ChatService} from "../../core/services/chat.service";

@Component({
  selector: 'app-chat-edit',
  templateUrl: './chat-edit.component.html',
  styleUrls: ['./chat-edit.component.css']
})
export class ChatEditComponent implements OnInit {
  token: string;
  chatForm: FormGroup;
  isEdit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.hasOwnProperty("id"))
    {
      let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

      this.chatService.getById(id)
        .subscribe((chat) => {
          this.isEdit = true;
          this.createForm(chat);
        })
    } else
    {
      let chat = new Chat();
      this.createForm(chat);
    }

  }

  createForm(chat: Chat)
  {
    this.chatForm = this.formBuilder.group({
      name: [chat.name, [Validators.required]],
    });
  }

  submit()
  {
    let chat = new Chat();
    chat.name = this.chatForm.get("name").value;

    this.chatService.insert(chat)
      .subscribe(() => {
        this.router.navigate(["chats"]);
      })
  }
}
