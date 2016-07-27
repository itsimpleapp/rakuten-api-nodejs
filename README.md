# Rakuten Linkshare API

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andrehrf/rakuten-api-nodejs/master/LICENSE)
[![npm version](https://badge.fury.io/js/rakuten-api.svg)](https://badge.fury.io/js/rakuten-api)

API integration with Rakuten Linkshare

## Install

```bash
$ npm install rakuten-api
```

## Get Affiliate ID, Auth Basic and Report ID

* Create account - https://signup.linkshare.com/publishers/registration/landing?ls-locale=us&host=linkshare
* Get Affiliate ID - https://pubhelp.rakutenmarketing.com/hc/en-us/articles/201848138-What-is-my-Affiliate-ID-?flash_digest=0d0d41fd46a159b4bb54f690a64edd333414c369
* Auth Basic - https://developers.rakutenmarketing.com/console/registry/resource/_system/governance/apimgt/applicationdata/provider/RakutenMarketing/artifacts/API_Developer_Portal-Acquiring_Your_Access_Token_Guide.pdf
* Report ID - https://developers.rakutenmarketing.com/console/registry/resource/_system/governance/apimgt/applicationdata/provider/LinkShare/CustomReports/1.0/documentation/files/CustomReports_1.0-Guide.pdf

## Usage

```js
"use strict";

let Rakuten = require("./index.js"),
    rakuten = new Rakuten("user", "pass", "affid", "auth basic");

rakuten.programs({}, function(err, result){
    console.log(result);
});

rakuten.coupons({}, function(err, result){
    console.log(result);
});

rakuten.report("report token", "report id", "20160101", "20160716", function(err, result){
    console.log(result);
});
```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.