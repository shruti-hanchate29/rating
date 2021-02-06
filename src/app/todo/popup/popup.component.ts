import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
      this.title = data.title;
      this.message = data.message;
     }

  ngOnInit(): void {
  }
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
