import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '../../interface/Schedule';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'schedule-item',
  templateUrl: 'schedule-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleItemComponent {

  @Input() date: string;
  @Input() items: Item;

  @Output() open: EventEmitter<any> = new EventEmitter();
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
