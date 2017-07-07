import { Directive, Input, OnChanges, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
@Directive({ selector: '[modelEvents]' })
export class ModelEventsDirective implements OnChanges {
    @Input() modelEvents: { [eventName: string]: () => void };
    constructor(private renderer: Renderer2, private el: ElementRef) { }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['modelEvents']) {
            for (const key in this.modelEvents) {
                if (this.modelEvents.hasOwnProperty(key)) {
                    this.renderer.listen(this.el.nativeElement, key, this.modelEvents[key]);
                }
            }
        }
    }
}
