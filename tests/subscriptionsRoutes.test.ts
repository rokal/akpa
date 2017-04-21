/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

var mockExpress = require('mock-express');
import { SubscriptionsRoutes } from "../src/server/subscriptionsRoutes";

describe("SubscriptionsRoutes test suite", () => {

    var app:any;

    beforeEach(() => {
        app = mockExpress(); // notice there's no "new"

    })

    it("Create customer", () => {

        var req = app.makeRequest({ 'host': 'http://www.google.com' });
        var res = app.makeResponse();

        let route = new SubscriptionsRoutes();
        app.use(SubscriptionsRoutes.RouteName, new SubscriptionsRoutes().init());

        app.invoke("post", SubscriptionsRoutes.RouteName + "/", req, res);
    })

})