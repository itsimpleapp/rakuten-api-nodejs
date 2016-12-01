"use strict";

const url = require("url"),
      request = require("request"),
      xmlJsonify = require('xml-jsonify');

module.exports = function(user, pass, sid, authorization){
    return {
        /**
         * Access token
         */
        token: null,
        
        /**
         * Session timeout
         */
        timeout: 0,
        
        /**
         * Function to generate the API request
         *
         * @param string URL 
         * @param function cb
         */
        getinapi: function(URL, auth, cb) {     
            let options = {
                url: URL,
                headers: {"Content-Type": "application/xml; charset=UTF-8", "authorization": "Bearer "+ auth}
            };
            
            request(options, (error, response, body) => {
                xmlJsonify(body, function(err, data){
                    cb(error, data);
                });
            });
        },
        
        /**
         * Function to generate application link
         *
         * @see http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters
         * @param string URLbase
         * @param object params
         * @return string
         */
        createurl: function(URLbase, params) {
            let paramsStr = Object.keys(params).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
            }).join('&');

            return URLbase + ((URLbase.indexOf("?") >= 0) ? "" : "?") + paramsStr;
        },
        
        /**
         * Functoin to get access token
         * 
         * @param function cb
         */
        createtoken: function(cb){
            var _this = this;
            let now = new Date().getTime()/1000;
            
            if(now > this.timeout || this.timeout == 0 || this.token === null){
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', "Authorization": authorization},
                    url: 'https://api.rakutenmarketing.com/token',
                    body: "grant_type=password&username=" + user + "&password=" + pass + "&scope=" + sid
                }, function(error, response, body){
                    body = JSON.parse(body);
                    _this.timeout = now + body.expires_in;
                    _this.token = body.access_token;
                    cb(body.access_token);
                });
            }
            else{
                return this.token;
            }
        },
        
        /**
         * Function to encode URL
         * 
         * @see http://locutus.io/php/url/urlencode/
         * @param str
         * @return str
         */
        urlencode: function(str){
            str = (str + '');
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
        },
        
        /**
         * Get advertiser programs
         *
         * @see https://developers.rakutenmarketing.com/subscribe/apis/info?name=AdvertiserSearch&version=1.0&provider=LinkShare&
         * @param object params         
         * merchantname: Advertiser Name
         * @param function cb
         */
        programs: function(params, cb) {
            var _this = this;
            
            this.createtoken(function(token){        
                let URL = _this.createurl("https://api.rakutenmarketing.com/advertisersearch/1.0", params);
                _this.getinapi(URL, token, cb);
            });
        },
        
        /**
         * Get products, including their tracking links
         * 
         * @see https://developers.rakutenmarketing.com/subscribe/apis/info?name=ProductSearch&version=1.0&provider=LinkShare#!/productsearch/ProductSearch_get_0
         * @param object params
         * keyword: Search Term to find products with all words specified (e.g. 'DVD' and 'Player')
         * exact: Search Term to find products with an exact match (e.g. 'DVD Player')
         * one: Search Term to find products with at least one match (e.g. 'DVD' or 'Player')
         * none: Combine in addition to keyword, exact, or one search to exclude certain results that match the Term specified
         * cat: Filter by category (e.g. 'Electronics')
         * max: Maximum results per page (Range: 0-100, Default: 20)
         * pagenumber: Page number of the results (Default: 1)
         * mid: Filter by one or more Advertiser IDs (Separate multiple by using the pipe character ['|'])
         * sort: Sort by a particular attribute (Retail Price ['retailprice'], Product Name ['productname'], Primary Category ['categoryname'], Advertiser ID ['mid'])
         * sorttype: Sort Order (Ascending ['asc'] or Descending ['dsc'])
         * @param function cb
         */
        product: function(params, cb) {
            var _this = this;
            
            this.createtoken(function(token){        
                let URL = _this.createurl("https://api.rakutenmarketing.com/coupon/1.0", params);
                _this.getinapi(URL, token, cb);
            });
        },
        
        /**
         * Get coupons, including their tracking links
         * 
         * @see https://developers.rakutenmarketing.com/subscribe/apis/info?name=Coupon&version=1.0&provider=LinkShare
         * @param object params
         * category: Filter by one or more Category IDs (Separate multiple by using the pipe character ['|'])
         * promotiontype: Filter by one of more Promotion Type IDs (Separate multiple by using the pipe character ['|'])
         * network: Filter by one or more networks (Separate multiple by using the pipe character ['|'])
         * mid: Filter by one or more Advertiser IDs (Separate multiple by using the pipe character ['|'])
         * resultsperpage: Specify a number between 1 and 500 to indicate desired result count per page. Specify 0 to acquire total result count
         * pagenumber: Page number of the results (Default: 1)
         * promocat: Specify '1' with no other options set to acquire all valid Category and Promotion Type IDs
         * @param function cb
         */
        coupons: function(params, cb){
            var _this = this;
            
            this.createtoken(function(token){        
                let URL = _this.createurl("https://api.rakutenmarketing.com/coupon/1.0", params);
                _this.getinapi(URL, token, cb);
            });
        },
        
        /**
         * Returns basic statistics of clicks, views, leads and sales
         * 
         * @param string reportname 
         * individual-item-report - Returns a detailed sales by product
         * link-type-report - Returns a sales summary by link type
         * media-optimization-report - Returns sales summary for media optimization
         * offer-report - Returns sales summary grouped by offer
         * product-success-report - Returns list of products that had a positive result in sales
         * revenue-report-by-day - Returns summary of sales per day
         * revenue-report-by-month - Returns summary of sales per month
         * sales-and-activity-report - Returns summary of sales and activities by advertiser
         * signature-activity-report
         * signature-orders-report
         * @param string token Security Token provided in the Report Generate
         * @param string bdate Start Date for Report (Format: YYYY-MM-DD)
         * @param string edate End Date for Report (Format: YYYY-MM-DD)
         * @param function cb
         */
        report: function(reportname, token, startDate, endDate, cb) {
            var _this = this;
            
            request("https://ran-reporting.rakutenmarketing.com/pt/reports/" + reportname + "/filters?start_date=" + startDate + "&end_date=" + endDate + "&include_summary=Y&network=8&tz=GMT&date_type=transaction&token=" + token , (error, response, body) => { 
                if(error){
                    cb(error, null);
                }
                else{
                    var CSVConverter = require("csv-string");            
                    var docs = CSVConverter.parse(body);                    
                    cb(false, docs);
                }
            });
        },
        
        /**
         * Create tracking links
         * 
         * @param string url
         * @param integer adspace
         * @return void
         */
        deeplink: function(url, rid, storeid, cb){
            request("http://click.linksynergy.com/deeplink?id="+rid+"&mid="+storeid+"&murl=" + this.urlencode(url), (error, response, body) => { 
                if(error)
                    cb(error, null);                
                else
                    cb(false, "http://click.linksynergy.com/deeplink?id="+rid+"&mid="+storeid+"&murl=" + this.urlencode(url));  
            });
        }
    }
}
