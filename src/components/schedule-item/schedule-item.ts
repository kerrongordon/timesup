import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Item } from '../../interface/Schedule';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'schedule-item',
  templateUrl: 'schedule-item.html'
})
export class ScheduleItemComponent {

  @Input() date: string;
  @Input() items: Item;

  @Output() open: EventEmitter<Item> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  openItemPage(data: Item) {
    return this.open.emit(data);
  }

  deleteItem(id: string, title: string, slidingItem: ItemSliding) {
    const infor = { id, title, slidingItem }
    return this.delete.emit(infor);
  }

}
