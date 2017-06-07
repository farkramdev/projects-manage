import { Directive, AfterViewInit, Input, ElementRef } from '@angular/core';
declare let $;
@Directive({
  selector: '[Scrollbar]'
})
export class ScrollbarDirective {
  @Input("Scrollbar") scroll: boolean;
  constructor(private el: ElementRef) {
    $(el.nativeElement).niceScroll({
      cursorcolor:"#a0a0a0",
      horizrailenabled: false,
      //cursorcolor: "tranparent",
      cursorborder: 0,
      smoothscroll: true,
      hidecursordelay: 1000,
      oneaxismousemode: "auto",
      autohidemode: true
    });
  }
}
