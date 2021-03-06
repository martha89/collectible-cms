"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
// Routes, Landing pages.
var password_reset_component_1 = require('./components/password-reset/password-reset.component');
var component_1 = require('./routes/site/home/component');
var component_2 = require('./routes/admin/home/component');
var component_3 = require('./routes/users/profile/component');
var component_4 = require('./routes/users/edit/component');
// Components.
var component_5 = require('./components/site/alert/component');
var component_6 = require('./components/site/menu/main/component');
var component_7 = require('./components/login/component');
var component_8 = require('./components/users/lists/all/component');
var component_9 = require('./components/users/create/quick/component');
var component_10 = require('./components/site/config/component');
var appRoutes = [
    { path: '', component: component_1.RoutesSiteHomeComponent },
    { path: 'admin', component: component_2.RoutesAdminHomeComponent },
    { path: 'password-reset', component: password_reset_component_1.PasswordReset },
    { path: 'u/:id', component: component_3.RoutesUsersProfileComponent },
    { path: 'u/:id/edit', component: component_4.RoutesUsersEditComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            declarations: [
                app_component_1.AppComponent,
                component_5.SiteAlertComponent,
                component_6.SiteMenuMainComponent,
                component_7.LoginComponent,
                component_8.UsersListsAllComponent,
                component_9.UsersCreateQuickComponent,
                component_10.SiteConfigComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map