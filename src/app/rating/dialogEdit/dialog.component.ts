import { animateChild } from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RatingDatabase } from '../rating-database';
import { FileNode, RatingComponent, TreeNode } from '../rating.component';
export interface animal
{
  name:string,
  type:string,
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{
  constructor(public _database: RatingDatabase,public dialog: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public node: FileNode) {}
    flatNodeMap = new Map<TreeNode, FileNode>();
    onNoClick(): void {
    this.dialog.close();
  }
}
