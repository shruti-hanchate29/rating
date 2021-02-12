import { Component, OnInit,Inject } from '@angular/core';
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
  okEnabled = false;
  okdisabled = false;
  namedisabled = false;
  initialdisabled = true;
  type;
  count;
  children;
  msg;

  constructor(public _database: RatingDatabase, public dialog: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public node: FileNode) {
    this.updateTypes(node.type);
    this.children =node.children;
    }
    flatNodeMap = new Map<TreeNode, FileNode>();
   ngOnInit(): void { }

   /*this method is for close dialog box */
   onNoClick(): void {
    this.dialog.close();
  }

  /**this method is for getting children */
  getChildNode(node) {}

  /* this Method is for check the selectedtype */
  selectedType(item){
    if(item==RatingConstants.TYPE_ZONE) {
        this.getChildNode(item)
        {
            var item =this.children;
            var atom = item.children;
            var count = atom.length;
         for (var i = 0; i < count; ++i) {
           if(atom[i].type ==RatingConstants.TYPE_ZONE)
           {
             this.msg ="Repetition not allowed!..."
             this.okdisabled=true;
             this.node.name = "Universal";
             this.okEnabled =true;
           }
          else{
            this.node.name = "Universal";
            this.okEnabled =true;
          }}
          if(item.children==0)
          {
            this.node.name = "Universal";
            this.namedisabled =true;
          }
       }}
    else if(item==RatingConstants.TYPE_ZONE1) {
        this.getChildNode(item)
        {
            var item =this.children;
            var atom= item.children;
            var count = atom.length;
         for (var i = 0; i < count; ++i) {
           if(atom[i].type ==RatingConstants.TYPE_ZONE1){
            this.msg ="Repetition not allowed!..."
             this.okdisabled=true;
             this.node.name = "Global";
             this.okEnabled = true;
           }
          else {
            this.node.name = "Global";
            this.namedisabled =true;
          }}
          if(item.children==0)
          {
            this.node.name = "Global";
            this.namedisabled =true;
          }
       }}
      else if(item !=RatingConstants.TYPE_ZONE1 && RatingConstants.TYPE_ZONE) {
        this.okEnabled =false;
        this.msg ="";
        this.node.name="";
      }
  }

/* for Update the nodeType which is array */
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
