import { OnChanges, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
export declare class ModelEventsDirective implements OnChanges {
    private renderer;
    private el;
    modelEvents: {
        [eventName: string]: () => void;
    };
    constructor(renderer: Renderer2, el: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
}
