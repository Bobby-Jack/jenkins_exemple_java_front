import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class StompService {
  constructor(
    private authService: AuthService
  ) {
    this.initializeWebSocketConnection();
  }

  public stompClient;

  initializeWebSocketConnection() {
    // tslint:disable-next-line:only-arrow-functions
  }

  connect(chatRoom: string, callback: (string) => void)
  {
    const serverUrl = environment.api.url;
    console.log(serverUrl);
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    console.log(`connect to chatroom ${chatRoom}`);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe(`/topic/${chatRoom}`, callback);
      that.stompClient.send(`/app/chat.addUser/${chatRoom}`, {}, JSON.stringify({
        sender: that.authService.getUser().username,
        type: 'JOIN'
      }));
    });
  }

  disconnect()
  {
    this.stompClient.disconnect();
  }

  sendMessage(message, chatRoom) {
    let msg = JSON.stringify(message)
    console.log(msg);
    this.stompClient.send(`/app/chat.sendMessage/${chatRoom}` , {}, msg);
  }
}
