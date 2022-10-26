import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {UserComponent} from "./components/user/user.component";
import {RecoverPasswordComponent} from "./components/recover-password/recover-password.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {ChatListComponent} from "./components/chat-list/chat-list.component";
import {ChatComponent} from "./components/chat/chat.component";
import {ChatEditComponent} from "./components/chat-edit/chat-edit.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserComponent },
  { path: 'recovery', component: RecoverPasswordComponent },

  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserProfileComponent },

  { path: 'chats', component: ChatListComponent },
  { path: 'chats/add', component: ChatEditComponent },
  { path: 'chats/:id/edit', component: ChatEditComponent },
  { path: 'chats/:id', component: ChatComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
