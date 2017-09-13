const cheerio = require('cheerio');
var fs = require("fs");
var path = require("path");

module.exports = function (content, weinreConfig) {
    return new Promise((resolve, reject) => {
        const vconsoleScript = '<script>' + fs.readFileSync(path.join(__dirname, '/vconsole.min.js')) + '</script>';
        content += vconsoleScript;

        if (!weinreConfig.open) {
            const NetworkTab = `
            <script>
                var networkTab = new vConsole.plugin.NetworkTab('network', 'Network'); 
                vConsole.addPlugin(networkTab);
            </script>
            `
            content += NetworkTab;
        }

        resolve(content);
    })
}