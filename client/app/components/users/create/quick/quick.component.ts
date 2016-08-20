import { Component }    from '@angular/core';
import { OnInit }       from '@angular/core';
import { User }         from '../../../../models/user';
import { UserService }  from '../../../../services/user/user.service';

@Component({
    selector: 'users-create-quick',
    templateUrl: 'app/components/users/create/quick/quick.html',
    styleUrls: ['app/components/users/create/quick/quick.css'],
})

export class UsersCreateQuickComponent implements OnInit {
    working: boolean = true;
	email: string;
	password: string;
    user: User = null;
    constructor(private userService: UserService) { }
    create() {
        this.working = true;
        let user = new User();
    	this.userService.create(user)
	    .subscribe(
			user => {
                this.user = user;
            },
		    err => console.log(err),
		    () => this.working = false
		);
    }
    ngOnInit() {
    }
};
