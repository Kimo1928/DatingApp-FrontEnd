import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { UserListComponent } from '../features/uses/user-list/user-list.component';
import { UserDetailedComponent } from '../features/uses/user-detailed/user-detailed.component';
import { ListsComponent } from '../features/lists/lists.component';
import { MessagesComponent } from '../features/messages/messages.component';
import { authGuard } from '../core/guards/auth.guard';
import { TestErrorsComponent } from '../features/test-errors/test-errors.component';
import { NotFoundComponent } from '../shared/errors/not-found/not-found.component';
import { ServerErrorComponent } from '../shared/errors/server-error/server-error.component';
import { UserProfileComponent } from '../features/uses/user-profile/user-profile.component';
import { UserPhotosComponent } from '../features/uses/user-photos/user-photos.component';
import { userResolver } from '../features/uses/user.resolver';
import { preventUnsavedChangesGuard } from '../core/guards/prevent-unsaved-changes.guard';
import { UserMessagesComponent } from '../features/uses/user-messages/user-messages.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'users', 
             
                component: UserListComponent },
            { path: 'users/:id', component: UserDetailedComponent ,
                resolve: {user:userResolver},
                runGuardsAndResolvers: 'always',
                children: [
                    {path: '', redirectTo: 'profile', pathMatch: 'full'},
                    {path: 'profile', component: UserProfileComponent,title: 'Profile'
                        ,canDeactivate:[preventUnsavedChangesGuard]
                    },
                    {path: 'photos', component: UserPhotosComponent, title: 'Photos'},
                    {path: 'messages', component: UserMessagesComponent, title: 'Messages'},

                ]
            },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    {path: 'errors', component: TestErrorsComponent },
    {path:'server-error',component:ServerErrorComponent},
    { path: '**', component: NotFoundComponent },
];