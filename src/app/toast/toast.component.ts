import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent{

  _show = false;
  _classNames = ''
  @Input() classNames = '';
  @Output() onCloseEvent = new EventEmitter<boolean>();
  @Input()
  set show(inputVal: boolean) {
    this._show = inputVal;
  }
  get show(): boolean {
    return this._show;
  }
  constructor() { }

  onClose() {
    this.show = false; 
    this.onCloseEvent.emit(false);
  }

}
