import { CanActivateFn } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

export const adminGuard: CanActivateFn = (route, state) => {
 const accountService =inject(AccountService)
 const toast = inject(ToastService)

 if(accountService.currentUser()?.roles.includes('Admin') || accountService.currentUser()?.roles.includes('Moderator')){
  return true
 }
 else{
  toast.error('You cannot Enter this area')
  return false;
 }

};
