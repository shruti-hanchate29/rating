import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileNode, TreeNode } from './rating.component';
import { files } from './example-data';
import { FlatTreeControl } from '@angular/cdk/tree';
/**
 * Tree Database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable({ providedIn: 'root' })
export class RatingDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  get data(): FileNode[] { return this.dataChange.value; }
  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    // const data = files;

    // Notify the change.
    this.dataChange.next(files);
  }

  /**
   * Build the file structure rating. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   **
  buildFileTree(obj: {[key: string]: any}, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
*/
  /** Add an item to to-do list */
  insertItem(parent: FileNode, name: string,type: string) {
    if (parent.children) {
      parent.children.push({name: name,type, children: []} as FileNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: FileNode, name: string, type: string) {
    node.name = name;
    node.type = type;
    this.dataChange.next(this.data);
  }

  rename()
  {
    this.dataChange.next(this.data);
  }

  deleteItem(_parentNode: FileNode, name: string) {
    if (_parentNode.children) {
      _parentNode.children = _parentNode.children.filter(c => c.name !== name);
      this.dataChange.next(this.data);
    }
  }
}
