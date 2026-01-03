import { Component, inject, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { registerCreds } from '../../models/user';
import { AccountService } from '../../core/services/account.service';
import { TextInputComponent } from "../../shared/text-input/text-input.component";
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInputComponent,NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {
protected creds ={} as registerCreds ;
private router=inject(Router);
protected validationErrors=signal<string[]>([]);
protected account=inject(AccountService);
private fb=inject(FormBuilder);
cancelRegister =output<boolean>();
protected credentialsForm:FormGroup;
protected profileForm:FormGroup;
protected currentStep=signal(1);
constructor(){
  this.credentialsForm=this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    userName: ['',Validators.required],
    password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
    confirmPassword: ['',[Validators.required,this.matchValues('password')]]
  });
  this.credentialsForm.controls['password'].valueChanges.subscribe(()=>{
    this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
  })

  this.profileForm=this.fb.group({
    gender: ['male',[Validators.required]],
    dateOfBirth: ['',[Validators.required]],
    city: ['',Validators.required],
    country: ['',Validators.required]
  });
}
  

  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null =>{
      const parent =control.parent;
      if(!parent) return null;
      return control.value === parent.get(matchTo)?.value ? null : {passworodMismatch:true};
    }
  }

  nextStep(){
    if(this.currentStep()===1 && this.credentialsForm.valid){
    return  this.currentStep.update(prev => prev + 1);
  }
}
  previousStep(){
    if(this.currentStep()===2){
      return this.currentStep.update(prev => prev - 1);
    }
  }


  getMaxDate(){
    const today=new Date();
    today.setFullYear(today.getFullYear() -18);
    return today.toISOString().split('T')[0];
  }


register(){
  if(this.credentialsForm.valid && this.profileForm.valid){
    const formData= {...this.credentialsForm.value,...this.profileForm.value};
    this.account.register(formData).subscribe({
      next: ()=> {
        this.router.navigateByUrl('/users');
     },
      error: error => {console.log(error);
      this.validationErrors.set(error);
      }
     })
  }

}
cancel(){
  console.log('cancelled!');
  this.cancelRegister.emit(false);
}
}
