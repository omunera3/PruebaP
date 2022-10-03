import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'ion-input[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private readonly elRef: ElementRef) { }

  @HostListener('ion-input', ['$event'])
  onchange(event: Event): void{
    const numbersOnly = /[^0-9]*/g;

    const initValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initValue.remplace(numbersOnly,'');
    if (initValue !== this.elRef.nativeElement.value){
      event.stopPropagation();
    }
  }
}
