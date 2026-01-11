import { Component ,model,input,output,computed} from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  pageNumber=model(1)
  pageSize=model(10)
  totalCount=input(0)
  totalPages=input(0)
  pageChanged=output<{pageNumber:number,pageSize:number}>()
  pageSizeOptions=input<number[]>([5,10,25,50,100])

  lastItemIndex=computed(
    ()=>Math.min(this.pageNumber()*this.pageSize(),this.totalCount()))
  
  onPageChange(newPage?:number,pageSize?:EventTarget|null){
    if(newPage)this.pageNumber.set(newPage)
    if(pageSize){
    
      const size=Number((pageSize as HTMLSelectElement).value)
      this.pageSize.set(size)
    }
    
      
    this.pageChanged.emit({pageNumber:this.pageNumber(),pageSize:this.pageSize()})
}
}
