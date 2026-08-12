import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserService } from '../../providers/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    imports: [CommonModule, FormsModule, RouterLink]
})
export class OrdersComponent implements OnInit {

    orders = []


    constructor(public userService: UserService, public loader: LoadingBarService) { }

    ngOnInit(): void {
        this.getOrders();
    }

    async getOrders() {
        this.loader.start();
        try {
            let data = await this.userService.listOrders();
            this.orders = data;
            console.log(data);
        } catch (err) { }
        this.loader.complete();
        ;
    }

    createOrderIdFromTimestamp(ts: string) {
        if (!ts) {
            console.error("Timestamp missing");
            return null;
        }

        const d = new Date(ts);

        if (isNaN(d.getTime())) {
            return null;
        }

        const yy = d.getFullYear().toString().slice(2);
        const mm = (d.getMonth() + 1).toString().padStart(2, '0');
        const dd = d.getDate().toString().padStart(2, '0');
        const hh = d.getHours().toString().padStart(2, '0');
        const mi = d.getMinutes().toString().padStart(2, '0');
        const ss = d.getSeconds().toString().padStart(2, '0');

        return yy + mm + dd + hh + mi + ss;
    }


    formatNext3Days(ts: string): string {
        const d = new Date(ts);

        // Add 3 days
        d.setDate(d.getDate() + 3);

        // Format: DD MMM YYYY
        return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

}
