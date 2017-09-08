import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAsyncContent]'
})
export class AsyncContentDirective implements OnInit{

  @Input() appAsyncContent: Promise<any>; // when this promise resolves, we show the content
  S: Element; // spinner element

  constructor(
    private E: ElementRef,
    private R: Renderer2
  ) {
  }

  ngOnInit() {

    const El = this.E.nativeElement;
    const P = this.R.parentNode(El);

    this.S = this.R.createElement('div');
    this.R.addClass(this.S, 'loading-spinner');

    if (this.R.nextSibling(El)) {
      this.R.insertBefore(P, this.S, this.R.nextSibling(El));
    } else {
      this.R.appendChild(P, this.S);
    }

    this.R.addClass(El, 'hidden');
    this.appAsyncContent.then(response => {
      if (typeof document !== 'undefined') {
        this.R.removeClass(El, 'hidden');
        this.R.removeChild(P, this.S);
      }
    });

  }

}
