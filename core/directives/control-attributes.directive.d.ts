import { OnChanges, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
export declare class ModelAttributesDirective implements OnChanges {
    private renderer;
    private el;
    modelAttributes: {
        [key: string]: string;
    };
    defaultClasses: [string];
    constructor(renderer: Renderer2, el: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
}
