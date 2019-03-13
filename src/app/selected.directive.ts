import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective {

  constructor(private ele:ElementRef) { }

  @HostListener('mouseenter') onmouseenter()
  {
  this.ele.nativeElement.style.background='#dee2e6';
  }
  @HostListener('mouseleave') onmouseleave()
  {
  this.ele.nativeElement.style.background='white';
  }


}
