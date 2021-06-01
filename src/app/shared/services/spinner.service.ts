import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    timer!: any;
    constructor(private spinner: NgxSpinnerService) {}

    show(time = 10000) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.spinner.show();
            this.timer = setTimeout(() => {
                this.spinner.hide();
            }, time);
        }, 200);
    }
    hide() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.spinner.hide();
        });
    }
}
