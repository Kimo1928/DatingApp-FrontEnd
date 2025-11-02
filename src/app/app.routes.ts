import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { UserListComponent } from '../features/uses/user-list/user-list.component';
import { UserDetailedComponent } from '../features/uses/user-detailed/user-detailed.component';
import { ListsComponent } from '../features/lists/lists.component';
import { MessagesComponent } from '../features/messages/messages.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: UserListComponent },
            { path: 'members/:id', component: UserDetailedComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: '**', component: HomeComponent },
];