exports.start = function(watch, compile){    
    var
    fs = require('fs'),
    path = require('path'),
    config = require('../config.json'),
    combo = function(html){
        var 
        filename = path.basename(html, '.html'),
        lesspath = path.join(config.source, filename + '.' + config.type);
        fs.readFile(html, 'utf8',  function(err, data){
            if(err) throw err;
            var 
            reg = /\<\!\-\-\[(.*)?\]\-\-\>/ig,
            p = [],
            t,
            content = '/**\n**html:'+html+'\n**/\n@charset "utf-8";\n';
            while((t=reg.exec(data))!=null){
                p.push(t[1]);
            }
            t = p.join(',').split(',');
            for(var i = t.length-1;i > -1; i--){
                content += '@import "' + t[i].trim() + '";\n';
            }
            fs.writeFile(lesspath, content, 'utf8', function(err){
            if(err) throw err;
            console.log(html + ' combo success!');
            console.log('path: '+ lesspath);
            });
        });
    };
    if(watch){
        watcher = require('watch-tree-maintained').watchTree(config.html, {
            'match' : '\.html$',
            'sample-rate' : 1 
        });
        watcher.on('fileModified', function(path){
            combo(path);
        });
        watcher.on('fileCreated', function(path){
            combo(path);
        });
    }

}
