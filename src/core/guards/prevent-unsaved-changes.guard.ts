import { CanDeactivateFn } from '@angular/router';
import { UserProfileComponent } from '../../features/uses/user-profile/user-profile.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<UserProfileComponent> 
= (component) => {
  if(component.editForm?.dirty){
    const confirmResult = window.confirm('You have unsaved changes. Do you really want to leave?');
    return confirmResult;

  }
  return true;
};
