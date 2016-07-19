/**
 * Rakuten Linkshare API interface for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see https://signup.linkshare.com/publishers/registration/landing?ls-locale=us&host=linkshare (Create account)
 * @see https://pubhelp.rakutenmarketing.com/hc/en-us/articles/201848138-What-is-my-Affiliate-ID-?flash_digest=0d0d41fd46a159b4bb54f690a64edd333414c369(Get Affiliate ID)
 * @see https://developers.rakutenmarketing.com/console/registry/resource/_system/governance/apimgt/applicationdata/provider/RakutenMarketing/artifacts/API_Developer_Portal-Acquiring_Your_Access_Token_Guide.pdf (Auth Basic)
 * @see https://developers.rakutenmarketing.com/console/registry/resource/_system/governance/apimgt/applicationdata/provider/LinkShare/CustomReports/1.0/documentation/files/CustomReports_1.0-Guide.pdf (Report ID)
 */

"use strict";

let Rakuten = require("./index.js"),
    rakuten = new Rakuten("user", "pass", "affid", "auth basic");

/*rakuten.programs({}, function(err, result){
    console.log(result);
});*/

/*rakuten.coupons({}, function(err, result){
    console.log(result);
});*/

/*rakuten.report("report token", "report id", "20160101", "20160716", function(err, result){
    console.log(result);
});*/