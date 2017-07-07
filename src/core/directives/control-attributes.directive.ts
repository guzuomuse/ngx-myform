import { Directive, Input, OnChanges, SimpleChanges, Renderer2, ElementRef } from '@angular/core';

@Directive({ selector: '[modelAttributes]' })
export class ModelAttributesDirective implements OnChanges {
    @Input() modelAttributes: { [key: string]: string };
    constructor(private renderer: Renderer2, private el: ElementRef) { }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['modelAttributes']) {
            for (const key in this.modelAttributes) {
                if (this.modelAttributes.hasOwnProperty(key)) {
                    const value = this.modelAttributes[key];
                    if (key.toLowerCase() === 'disabled' || key.toLowerCase() === 'value') {
                        return;
                    } else {
                        this.renderer.setAttribute(this.el.nativeElement, key, value);
                    }
                }

            }
        }
    }
}
