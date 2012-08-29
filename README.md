# Autocombo

autocombo less module from html to css

## Install
    $ sudo npm install autocombo -g

## Usage

you must modify ``config.json`` first.
It just like this:

    {
        "html": "/var/www/html", //html page path
        "less": "/var/www/less/page", // combo less path
        "css": "/var/www/css/page", // parser combo less to css path (if is null the same as combo less path)
        "minify": false // parser combo css minify option
    }

In the HTML just like this:

    <html>
        <head><head>
        <body>
            <!--[../gloabl, ../mod-test]-->
            <div class="mod-test"></div>
        <body>
    <html>

The result of combo less like this:

    /**
    **html:/var/www/html/test.html
    **/
    @charset "utf-8";
    @import "../global";
    @import "../mod-test";

At a glance:
    
    $ autocombo [-w/--watch]

combo once:

    $ autocombo
watch file change and combo real time:

    $ autocombo -w/--watch

if you need help information:
  
    $ autocombo -h/--help

