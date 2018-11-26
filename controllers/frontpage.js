'use strict';

const fs 	= require('fs');
const path	= require('path');
const LRU 	= require('lru-cache');
const csso 	= require('csso');
const cache = new LRU({
    max: 3000,
    length: (n, key) => n * 2 + key.length,
    maxAge: 1000 * 60 * 60 // 1hour
});

let styles = [];
if (!__DEV__) {
    styles.push(csso.minify(fs.readFileSync(path.join(__dirname, '../assets/reset.css'))).css);
    styles.push(csso.minify(fs.readFileSync(path.join(__dirname, '../assets/default.css'))).css);
}

module.exports = async function (ctx) {
	let outdatedbrowser = ctx.userAgent.isIE && (parseInt(ctx.userAgent.version) <= 10);
	let cacheKey		= ctx.i18n.locale + ctx.userAgent.browser + parseInt(ctx.userAgent.version);
	let hasPageCache 	= cache.has(cacheKey);

	if (hasPageCache) return ctx.body = cache.get(cacheKey);

	let locals = {
        styles,
		outdatedbrowser,
		pageTitle: ctx.i18n.__('frontpage.PAGE_TITLE'),
		appDescription: ctx.i18n.__('frontpage.APP_DESCRIPTION'),
		copyright: ctx.i18n.__('frontpage.COPYRIGHT'),
		city: ctx.i18n.__('frontpage.CITY'),
		country: ctx.i18n.__('frontpage.COUNTRY'),
		streetAddress: ctx.i18n.__('frontpage.STREET_ADDRESS'),
		placeName: ctx.i18n.__('frontpage.PLACE_NAME'),
		region: ctx.i18n.__('frontpage.REGION'), // subdivision code list: https://en.wikipedia.org/wiki/ISO_3166-2
		author: 'Konstantin Aleksandrov',
		homepage: 'https://site.com',
		appName: ctx.i18n.__('frontpage.APP_NAME'),
		twitterCard: 'summary',
		twitterCreator: '@your_twitter_account',
		fbAdmins: '123456789',
		ogType: 'website',
		latitude: '55.029668',
		longitude: '82.918915',
		postalCode: '630000',
		phoneNumber: '+ 7 800 000 00 00',
		email: 'email@email.com'
	};

    let page = ctx.renderToString('frontpage/tmpl/index', locals);

    cache.set(cacheKey, page);

	ctx.body = page;
};
