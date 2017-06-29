import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export declare class SanitizeHtmlPipe implements PipeTransform {
    private _sanitizer;
    constructor(_sanitizer: DomSanitizer);
    transform(value: string): SafeHtml;
}
