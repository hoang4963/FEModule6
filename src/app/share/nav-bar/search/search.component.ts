import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
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
}
