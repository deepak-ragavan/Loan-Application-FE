import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TableServiceService } from './common-services/table-service.service';


export interface PeriodicElement {
  loanId: string;
  paymentStatus: string;
  amount: number;
  loanNumber: number;
  checkbox?: boolean ;
  loanType: string;
  linkStatus: string;
  linkExpiryDate?: Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Checkbox', 'LoanID', 'Loan Num', 'Payment Status', 'Amount','Loan Type','Status'];
  dataSource:PeriodicElement[] = [];
  disableSelect = new FormControl(false);
  Operators = [ '<','>','>=','<=','==','none'];
  searchItem = ['send link', 'all', 'link sent']
  selectedValue: string = '';
  selectedInput: string ='';
  amountData: Number=0;
  checkBox: Number[]= [];
  checked:boolean= false;


  constructor(private service: TableServiceService){

  }

  ngOnInit(){
      this.tableList();
  }

  tableList(): void {
    this.service.tableList().subscribe((data: any) => {
       this.dataSource =data


    })
  }
  applyFilter(): void {
  const filterObj = {
      amount : this.selectedValue && this.selectedValue !== 'none' ? this.amountData : '',
     operator: this.selectedValue && this.selectedValue !== 'none'  ? this.selectedValue : '',
     linkStatus: this.selectedInput ? this.selectedInput : ''
  }
  console.log(filterObj);

   this.service.getFilter(filterObj).subscribe((data:any)=> {
    this.dataSource = data
   })

    // })
    // this.dataSource = data
    // console.log(this.dataSource);



    // this.dataSource.filter = filter;

  }
  sendLink(): void{

this.service.sendLink(this.checkBox).subscribe((data:any)=>{
  if(data && data.length) {
    this.dataSource = data;
  } else {
     this.dataSource = [];
  }
  console.log(data)
})
  }
  checkBoxs(event:any, Id: Number){
    console.log(event.checked, Id)
    if (event.checked && !this.checkBox.includes(Id)){
      this.checkBox.push(Id)
    }else {
      this.checkBox =  this.checkBox.filter((value) => {
        return value !== Id
      })
    }
    console.log( this.checkBox);



  }
}
