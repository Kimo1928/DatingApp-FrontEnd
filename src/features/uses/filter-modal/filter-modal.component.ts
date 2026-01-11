import { Component, ElementRef,output,ViewChild ,model} from '@angular/core';
import { UserParams } from '../../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-modal',
  imports: [FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {
  @ViewChild('filterModal') modalRef!: ElementRef<HTMLDialogElement>;

  closeModal=output();
  submitData = output<UserParams>();

  userParams=model<UserParams>(new UserParams());
  constructor(){
    const filters=localStorage.getItem('filters');
    if(filters){
      this.userParams.set(JSON.parse(filters));     
    }
  }
  open() {
    this.modalRef.nativeElement.showModal();
  }

  close(){
    this.modalRef.nativeElement.close();
    this.closeModal.emit();
  }

  submit() {
    this.submitData.emit(this.userParams());
    this.close();
  }

  onMinAgeChange() {
    if(this.userParams().minAge <18)
      this.userParams().minAge = 18;
  }
  onMaxAgeChange() {
    if(this.userParams().maxAge >100)
      this.userParams().maxAge = 100;
    if(this.userParams().maxAge < this.userParams().minAge)
      this.userParams().maxAge = this.userParams().minAge;

  }
}
