import { ResolveFn, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { inject } from '@angular/core';
import { user, userDTO } from '../../models/user';
import { EMPTY } from 'rxjs';

export const userResolver: ResolveFn<userDTO> = (route, state) => {
  const userService = inject(UserService);
  const router=inject(Router);
  const userId = route.paramMap.get('id');  
  if(!userId) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  } 
  return userService.getUser(userId);
};
