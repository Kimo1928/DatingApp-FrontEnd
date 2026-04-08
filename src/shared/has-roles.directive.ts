import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../core/services/account.service';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective {
@Input() appHasRoles:string[]=[]
private accountService=inject(AccountService)
private viewContainerRef=inject(ViewContainerRef)
private templeteRef=inject(TemplateRef)

ngOnInit():void{
if(this.accountService.currentUser()?.roles?.some(r=>this.appHasRoles.includes(r)))
  this.viewContainerRef.createEmbeddedView(this.templeteRef)
else{
  this.viewContainerRef.clear();
}
}

}
