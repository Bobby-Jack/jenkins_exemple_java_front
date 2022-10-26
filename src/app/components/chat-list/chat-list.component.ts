import { Component, OnInit } from '@angular/core';
import {Chat} from "../../core/models/chat.model";
import {ChatService} from "../../core/services/chat.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  availableChats: Array<Chat>;

  constructor(
    private chatService: ChatService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.chatService.getAll()
      .subscribe((chats) =>
      {
        this.availableChats = chats;
      });
  }

  connectTo(id: number)
  {
    this.chatService.connect(id)
      .subscribe((room) =>
      {
        console.log(room);
        this.router.navigate(['chats', id]);
      })
  }
}
