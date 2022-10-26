import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {StompService} from "../../core/services/stomp.service";
import {ChatService} from "../../core/services/chat.service";
import {Subscription} from "rxjs";
import {Chat} from "../../core/models/chat.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  receivedMessages: string[] = [];
  chatRoom: Chat;
  topicSubscription: Subscription;
  msgCtrl: FormControl;

  constructor(
    private chatService: ChatService,
    private stompService: StompService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.msgCtrl = new FormControl('Entrer un message...');

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    if(!isNaN(id))
    {
      this.chatService.getById(id)
        .subscribe((chat) =>
        {
          this.chatRoom = chat;

          this.stompService.connect(this.chatRoom.name, (msg: any) =>{
            let message = JSON.parse(msg.body) as { sender: string; content: string; type: string };

            switch(message.type)
            {
              case 'JOIN':
                message.content = `${message.sender} a rejoin le chat`;
                break;
              case 'LEAVE':
                message.content = `${message.sender} a quitter le chat`;
                break;
              case 'MESSAGE':
                message.content = `${message.sender} : ${message.content}`
                break;
            }

            this.receivedMessages.push(message.content);
          });
        })
    }
  }

  ngOnDestroy() {
    this.stompService.disconnect();

    this.topicSubscription.unsubscribe();
  }

  sendMessage()
  {
    let message = {
      sender: this.authService.getUser().username,
      content: this.msgCtrl.value,
      type: 'MESSAGE'
    }

    this.stompService.sendMessage(message, this.chatRoom.name);

    this.msgCtrl.setValue('');
  }
}
