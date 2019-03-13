import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNavSelected]'
})
export class NavSelectedDirective {

  constructor(private ele:ElementRef) { }

  
  @HostListener('mouseenter') onclick()
  {
  this.ele.nativeElement.selected=true;
  }
 

}
