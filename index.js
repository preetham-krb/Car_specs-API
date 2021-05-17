const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app= express();


app.get('/', function(req, res){
    let maker = req.query.maker;
    let car = req.query.car;
    let name = maker.charAt(0).toUpperCase() + maker.substr(1).toLowerCase()+' '+car.charAt(0).toUpperCase() + car.substr(1).toLowerCase();;
    let url = 'https://www.cardekho.com/'+maker+'/'+car+'/specs'
    
    
    request(url, function(error, response, html) {
        if (!error) {

            var $ = cheerio.load(html);

            let map = new Map()
            map.set('Car',name)
            map.set('Price',$('#rf01 > div.app-content > div > div.modelSpecsMain > main > div.gsc_row > div.gsc_col-xs-12.gsc_col-sm-12.gsc_col-md-8.gsc_col-lg-9.specsAllLists > section.clearfix.modelOverviewTop.shadow24.marginBottom20 > div > div.gsc_col-xs-9.gsc_col-sm-9.gsc_col-md-9.gsc_col-lg-9.overviewdetail.specsofferStrip > div.price > span > span').text());
            map.set('img_src',$('#rf01 > div.app-content > div > div.modelSpecsMain > main > div.gsc_row > div.gsc_col-xs-12.gsc_col-sm-12.gsc_col-md-8.gsc_col-lg-9.specsAllLists > section.clearfix.modelOverviewTop.shadow24.marginBottom20 > div > div.gsc_col-xs-3.gsc_col-sm-3.gsc_col-md-3.gsc_col-lg-3 > div > span > img').attr('src'));
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(1) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(2) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(2) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(3) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(3) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(4) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(4) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(5) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(5) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(6) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(6) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(7) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(7) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(8) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(8) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(9) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(9) > td.right > span').text());
            map.set($('div:nth-child(1) > div > table > tbody > tr:nth-child(10) > td:nth-child(1):not(.right):first').text(),$('div:nth-child(1) > div > table > tbody > tr:nth-child(10) > td.right > span').text());

            
          let json = {};  
        map.forEach((value, key) => {  if (key!=="") {
        json[key] = value;  }
        });

          

          res.send(json);
        }
    });
    
});



app.listen(process.env.PORT || 5000);
module.exports = app;