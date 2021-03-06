'use strict';

const glob     	  	   = require('glob');
const addToStaticAsync = require('@gen-server/utils/copyToStatic');
// const removeFromStatic = require('@gen-server/utils/removeFromStatic');
const Router      	   = require('@gen-server/lib/router');
const router      	   = new Router();
const frontpage   	   = require('./controllers/frontpage');

addToStaticAsync(glob.sync(`${__dirname}/static/*`));
// removeFromStatic(glob.sync(`${__dirname}/static/*`));
router
	.get('/', ctx => ctx.body = frontpage(ctx))
	.get('/__userAgent__', async ctx => ctx.body = ctx.userAgent);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
