/**
 * Created by lzhan on 2017/8/27.
 */
import { Directive, ElementRef, Input,HostListener } from '@angular/core';

@Directive({ selector: '[myStyle]' })
export class StyleDirective {
  @Input('myStyle') styleColor: string;

  constructor(private el: ElementRef) {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.styleColor||'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}


