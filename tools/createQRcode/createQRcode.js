const cheerio = require('cheerio');
var fs = require("fs");
var getIP = require("../getIP");
var QRCode = require('qrcode');

/**
 * ext: 生成二维码
 */
module.exports = function (content, dir) {
    return new Promise((resolve, reject) => {
        const ip = "http://" + getIP + ":" + dir;
        QRCode.toDataURL(ip, {scale: 8}, function (err, url) {
            const qrImg = `<img src="${url}">`;            
            const $ = cheerio.load(fs.readFileSync('./tools/createQRcode/createQRcode.html', "utf-8"));
            $('.bird-tools_qrcode-content').append(qrImg);
            content += $.html();
            resolve(content);
        })
    });
}