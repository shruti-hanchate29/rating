import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RatingConstants } from '../rating-constants';
import { RatingDatabase } from '../rating-database';
import { FileNode, RatingComponent, TreeNode } from '../rating.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{
  nodeTypes =[];
  okEnabled = false;
  constructor(public _database: RatingDatabase,public dialog: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public node: FileNode) {
      //console.log(node.type);
      this.updateTypes(node.type);
    }
    flatNodeMap = new Map<TreeNode, FileNode>();
    onNoClick(): void {
    this.dialog.close();
  }

  /* for Update the nodeType which is array */
  updateTypes(type: string)
  {
    switch (type)
    {
      case RatingConstants.TYPE_DOMAIN_TP:
          this.nodeTypes =
          [
            RatingConstants.TYPE_DOMAIN_TP,
          ];
        break;
      case RatingConstants.TYPE_DOMAIN:
        this.nodeTypes =
        [
          RatingConstants.TYPE_DOMAIN,
        ];
        break;
      case RatingConstants.TYPE_PROJECT:
        this.nodeTypes =
        [
          RatingConstants.TYPE_PROJECT
        ];
        break;
      case RatingConstants.TYPE_PRODUCT:
        this.nodeTypes =
        [
          RatingConstants.TYPE_PRODUCT
        ];
        break;
      case RatingConstants.TYPE_STATE:
        this.nodeTypes =
        [
          RatingConstants.TYPE_STATE
        ];
        break;
        case RatingConstants.TYPE_ZONE:
          this.nodeTypes =
          [
            RatingConstants.TYPE_ZONE
          ];
          this.okEnabled=true;
          break;
      case RatingConstants.TYPE_ZONE1:
        this.nodeTypes =
          [
            RatingConstants.TYPE_ZONE1
          ];
          this.okEnabled=true;
          break;
      case RatingConstants.TYPE_PROGRAM:
        this.nodeTypes =
          [
            RatingConstants.TYPE_PROGRAM
          ];
        break;
    }
  }
}
