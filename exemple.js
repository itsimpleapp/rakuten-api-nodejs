/**
 * Rakuten Linkshare API interface for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see https://signup.linkshare.com/publishers/registration/landing?ls-locale=us&host=linkshare (Create account)
 * @see https://pubhelp.rakutenmarketing.com/hc/en-us/articles/201848138-What-is-my-Affiliate-ID-?flash_digest=0d0d41fd46a159b4bb54f690a64edd333414c369(Get Affiliate ID)
 * @see https://developers.rakutenmarketing.com/console/registry/resource/_system/governance/apimgt/applicationdata/provider/RakutenMarketing/artifacts/API_Developer_Portal-Acquiring_Your_Access_Token_Guide.pdf (Auth Basic)
 * @see Custom Report - http://affiliatetip.com/custom-reporting-for-advertisers-from-rakuten-linkshare/ (Custom Report)
 */

"use strict";

let Rakuten = require("./index.js"),
    rakuten = new Rakuten("user", "pass", "affid", "auth basic");

rakuten.programs({}, function(err, result){
    console.log(result);
});

rakuten.coupons({}, function(err, result){
    console.log(result);
});

rakuten.report("report name", "token", "2016-01-01", "2016-07-16", function(err, result){
    console.log(result);
});

rakuten.deeplink("http://www.zattini.com.br/", "h5aPSz1vA84", 41254, function(err, url){
    console.log(url);//http://click.linksynergy.com/deeplink?id=h5aPSz1vA84&mid=41254&murl=http%3A%2F%2Fwww.zattini.com.br%2F
});