import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHtml'
})

export class SanitizeHtmlPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) {
    }
    transform(_value: string): SafeHtml {
        if (!_value) {
            return '';
        } else {
            return this._sanitizer.bypassSecurityTrustHtml(_value);
        }
    }
}
