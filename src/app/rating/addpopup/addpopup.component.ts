import { Component, OnInit,Inject } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RatingConstants } from '../rating-constants';
import { RatingDatabase } from '../rating-database';
import { FileNode, RatingComponent, TreeNode } from '../rating.component';
@Component({
  selector: 'app-addpopup',
  templateUrl: './addpopup.component.html',
  styleUrls: ['./addpopup.component.css']
})
export class AddpopupComponent implements OnInit {

  nodeTypes =[];
  detailButtonEnabled = false;
  packageEnabled = false;
  noDataFound = false;
  okEnabled = false;
  type;
  count;
  listConditions: any;
  constructor(public _database: RatingDatabase, public dialog: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public node: FileNode) {
    this.updateTypes(node.type);
   // console.log(node);
    }
  ngOnInit(): void { }

   onNoClick(): void {
    this.dialog.close();
  }

  /* this Method is for check the selectedtype */
  selectedBT(item)
  {
    if(item==RatingConstants.TYPE_ZONE)//if type is zone then
      {
          this.node.name = "Universal";
          this.okEnabled =true;
          this.packageEnabled = true;
      }
    else if(item==RatingConstants.TYPE_ZONE1)
      {
        this.node.name ="Global";
        this.okEnabled =true;
        this.packageEnabled = true;
      }
      else if(item !=RatingConstants.TYPE_ZONE1 && RatingConstants.TYPE_ZONE)
      {
        this.okEnabled =false;
        this.packageEnabled = true;
      }
  }

  updateTypes(type: string)
  {
    switch (type)
    {
      case RatingConstants.TYPE_DOMAIN_TP:
          this.nodeTypes =
          [
            RatingConstants.TYPE_DOMAIN,
          ];
        break;
      case RatingConstants.TYPE_DOMAIN:
        this.nodeTypes =
        [
          RatingConstants.TYPE_PROJECT,
        ];
        break;
      case RatingConstants.TYPE_PROJECT:
        this.nodeTypes =
        [
          RatingConstants.TYPE_PRODUCT,
          RatingConstants.TYPE_ZONE
        ];
        break;
      case RatingConstants.TYPE_PRODUCT:
        this.nodeTypes =
        [
          RatingConstants.TYPE_STATE,
          RatingConstants.TYPE_ZONE1
        ];
        break;
      case RatingConstants.TYPE_STATE:
        this.nodeTypes =
        [
          RatingConstants.TYPE_PROGRAM
        ];
        break;
    }
  }

}
