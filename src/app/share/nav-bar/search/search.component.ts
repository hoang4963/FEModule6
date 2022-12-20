import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  formSearch = new FormGroup({
    address: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    bedrooms: new FormControl(),
    bathrooms: new FormControl(),
    rent: new FormControl()
  })
  search: any;
  // name: string;
  constructor(
    private _mdr: MatDialogRef<SearchComponent>,
    // @Inject(MAT_DIALOG_DATA) data: string
  ) {
    // this.name = data.name;
  }
  CloseDialog() {
    this._mdr.close(false)
  }
  searchAll(){
    this.search = this.formSearch.value;
    if (this.search.address != null || this.search.address == ""){
      this.search.address = ".*";
    }
    if (this.search.bedrooms != null || this.search.bathrooms == ""){
      this.search.bedrooms = ".*";
    }
    if (this.search.bathrooms != null || this.search.bathrooms == ""){
      this.search.bathrooms = ".*";
    }
    if (this.search.startTime != null || this.search.startTime == ""){
      this.search.startTime = "1970-01-01";
    }
    if (this.search.endTime != null || this.search.endTime == ""){
      this.search.endTime = "2100-01-01";
    }
    if (this.search.bathrooms != null || this.search.bathrooms == ""){
      this.search.address = ".*";
    }
    if (this.search.rent != null || this.search.rent == ""){
      this.search.rent = "4";
    }
  }
}
