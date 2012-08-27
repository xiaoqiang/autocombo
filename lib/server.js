exports.start = function(watch){    
    var
    fs = require('fs'),
    path = require('path'),
    less = require('less'),
    config = require('../config.json'),
    combo = function(html){
        var 
        filename = path.basename(html, '.html'),
        lesspath = path.join(config.less, filename + '.less'),
        csspath = path.join(config.css ? config.css: config.less, filename + '.css');
        fs.readFile(html, 'utf8',  function(err, data){
            if(err) throw err;
            var 
            reg = /\<\!\-\-\[(.*)?\]\-\-\>/ig,
            p = [],
            t,
            content = '/**\n**html:'+html+'\n**/\n@charset "utf-8";\n',
            hashtable = [];
            while((t=reg.exec(data)) !== null){
                p.push(t[1]);
            }
            t = p.join(',').split(',');
            var l = t.length;
            for(var i = 0;i < l; i++){
                var item = t[i].trim();
                hashtable[item] || (content += '@import "' + item + '";\n');
                hashtable[item] = true;
            }
            fs.writeFile(lesspath, content, 'utf8', function(err){
                if(err) throw err;
                var parser = new(less.Parser)({
                    paths: [config.less],
                    filename: lesspath
                });
                parser.parse(content, function(er, tree){
                    if(er) throw er;
                    var _css = tree.toCSS({compress: config.minify});
                    fs.writeFile(csspath, _css, 'utf8', function(erro){
                        if(erro) return console.error(erro);
                        console.log('css path: '+ csspath)
                    });
                });
                console.log(html + ' combo success!');
                console.log('source path: '+ lesspath);
            });
        });
    };
    if(watch){
        watcher = require('watch-tree-maintained').watchTree(config.html, {
            'match' : '\.html$',
            'sample-rate' : 1 
        });
        watcher.on('fileModified', function(filePath){
            combo(filePath);
        });
        watcher.on('fileCreated', function(filePath){
            combo(filePath);
        });
    }
    fs.readdirSync(config.html).forEach(function (file) {
        if (! /\.html$/.test(file)) return;
        combo(path.join(config.html, file));
    });
}
