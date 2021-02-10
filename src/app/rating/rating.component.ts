import { Component,Inject, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import { AfterViewInit } from '@angular/core';
import { RatingConstants } from './rating-constants';
import { RatingDatabase } from './rating-database';
import{ ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from './dialogEdit/dialog.component';
import { PopupComponent,ConfirmDialogModel } from "./popup/popup.component";
import { AddpopupComponent } from './addpopup/addpopup.component';

export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}
/** Flat node with expandable and level information */
export class TreeNode {
  program_id?:number;
  name: string;
  version_id:number;
  type: string;
  created_date?:string;
  modified_date?:string;
  level?: number;
  expandable?: boolean;
}
export interface tables {
  name: string;
  type: string;
}

@Component({
  selector: 'rating-app',
  templateUrl: './rating.component.html',
  styleUrls: [ './rating.component.scss' ]
})
export class RatingComponent implements AfterViewInit {

  // Tree rest of the component statements
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TreeNode, FileNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<FileNode, TreeNode>();

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<TreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, TreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, TreeNode>;

/* table Data */
  displayedColumns: string[] = ['program_id','name','version_id', 'type','created_date','modified_date'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
/*  end here*/
  nodeTypes = [];
  opened: boolean = true;
  events: string[] = [];
  arr : any = [];
  name;
  type;
  level;
  isdailog:boolean=false;
  tableData :any;
  tableHeader;
  itemValue;
  count=0;
  createdDate;
  modifiedDate;
  flag1:boolean= false;
    constructor(public _database: RatingDatabase,public dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);
    this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = files;
    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  ngAfterViewInit() {
    // this.treeControl.expandAll();
    this._database.dataChange.subscribe(data => {
      this.tableData = new MatTableDataSource(data);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  });

    // this.arr.sort = this.sort;
     //this.arr.sort=this.sort;
     //this.arr.paginator = this.paginator;

  }


  /** Transform the data to something the tree can read. */
  transformer = (node: FileNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
          ? existingNode
          : new TreeNode();
      flatNode.name = node.name;
      flatNode.type = node.type;
      flatNode.level = level;
      flatNode.expandable = !!node.children?.length;
      this.flatNodeMap.set(flatNode, node);
      this.nestedNodeMap.set(node, flatNode);
      return flatNode;
  }

 /** Get the level of the node */
  getLevel(node: TreeNode) {
    return node.level;
  }

  /** Return whether the node is expanded or not. */
  isExpandable(node: TreeNode) {
    return node.expandable;
  };

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: TreeNode){
    return node.expandable;
  }

  hasNoContent = (_: number, node: TreeNode) => {
    return node.name === '';
  }

  // getChildren = (node: Node): Node[] | undefined => node.children;
  addIcon(node: TreeNode) {
    const addNoTypes = [RatingConstants.TYPE_PROGRAM, RatingConstants.TYPE_ZONE,RatingConstants.TYPE_ZONE1];
    if (addNoTypes.indexOf(node.type) != -1)
      return false;
    else
      return true;
  }

  deleteIcon(node: TreeNode) {
    return true;
  }

  /* Get the parent node of a node */
  getParentNode(node: TreeNode): TreeNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
       //  console.log(currentNode);
        return currentNode;

      }
    }
    return null;
  }


  /* Get the parent node of a node */
  getChildNode(node: TreeNode) {
    return this.flatNodeMap.get(node);
  }
  /** Select the category so we can insert the new item. */
  addNode(node: TreeNode,type,children) {
    type=node.type
    children = this.flatNodeMap.get(node);
    let dialogRef= this.dialog.open(AddpopupComponent,
      {
        width: 'auto',
        data: {node,type,children}
      });

  dialogRef.afterClosed().subscribe(result =>
    {
        if(result != null)
        {
        node.name = result.name;
        node.type = result.type;
        const nestedNode = this.flatNodeMap.get(node);
        this._database.insertItem(nestedNode!, node.name, node.type);
        this.treeControl.expand(node);
        }
        else
        {
          this.treeControl.expand(node);
        }
    });
    this.treeControl.expand(node);
    }

  deleteNode(node: TreeNode) {
    // Get the parent node of the selected child node
    const parentNode = this.getParentNode(node);
    // Map from flat node to nested node.
    const parentIcon =this.getLevel(node);
    const parentHasChild =this.hasChild(parentIcon,node);
    if(parentHasChild==true)
    {
      const message = `Please First Delete Child Elements!...`;
      const dialogData= new ConfirmDialogModel("Failed to delete!...", message);
      const dialogRef = this.dialog.open(PopupComponent, {
        data: dialogData
      });
    }
    else
    {
      const parentFlat = this.flatNodeMap.get(parentNode);
      this._database.deleteItem(parentFlat!, node.name);
      this.treeControl.expand(node);
    }
  }

  public editItem(node: TreeNode, name:string,type:any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name,type}
    });
     dialogRef.afterClosed().subscribe(result => {
      if(result != null)
      {
          node.name = result.name;
          node.type = result.type;
          const nestedNode = this.flatNodeMap.get(node);
          this._database.updateItem(nestedNode!, node.name, node.type);
          }
          else
          {
            this.treeControl.expand(node);
          }
        });
          this.modifiedDate=Date.now();
    }

  cancelNode(node: TreeNode) {
  }

  selectedItem: any;
  selectedNode(node: TreeNode)
  {
     this.flag1=!this.flag1;
     this.selectedItem = this.getChildNode(node);
    //console.log('Selected Node: ', this.selectedItem);
     var children = this.getChildNode(node);
     this.tableData = children.children;
     this.tableHeader = children;
     this.level=this.getLevel(node);
     this.createdDate =Date.now();
     for (var i=1; i<this.tableData.length; i++)
      {
       this.count++;
      }
  }


  getMatIcon(node: TreeNode) {
    switch (node.type) {
      case RatingConstants.TYPE_DOMAIN_TP:
        return 'device_hub';
      case RatingConstants.TYPE_DOMAIN:
        return 'domain';
      case RatingConstants.TYPE_PROJECT:
        return 'card_travel';
      case RatingConstants.TYPE_PRODUCT:
        return 'folder';
      case RatingConstants.TYPE_PROGRAM:
        return 'text_snippet';
      case RatingConstants.TYPE_ZONE:
        return 'language';
      case RatingConstants.TYPE_ZONE1:
          return 'language';
      case RatingConstants.TYPE_STATE:
        return 'home';
    }
  }

}
