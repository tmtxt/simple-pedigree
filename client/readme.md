# 1. Structure overview

````
BASE_DIR
 ├─gulp
 ├─version
 ├─source
 │   ├─javascript
 │   │   ├─models
 │   │   │   ├─model1.js
 │   │   │   └─model2.js
 │   │   ├─views
 │   │   │   ├─view1.jsx
 │   │   │   └─view2.jsx
 │   │   ├─commons
 │   │   │   ├─common1.js
 │   │   │   └─common2.js
 │   │   ├─pages
 │   │   │   ├─page1
 │   │   │   │   ├─main.js
 │   │   │   │   └─maybe─other─file.js
 │   │   │   └─page2
 │   │   │       └─main.js
 │   │   └─share
 │   │       └─share1.js
 │   ├─stylesheet
 │   │   ├─commons
 │   │   │   ├─common.less
 │   │   │   └─maybe-other-file.less
 │   │   ├─pages
 │   │   │   ├─page1.less
 │   │   │   └─page2.less
 │   │   └─libs
 │   │       ├─bootstrap --> /client/source/bower/bootstrap/less
 │   │       ├─lib1.less
 │   │       └─lib2.less
 │   ├─assets
 │   └─bower
 └─dist
     ├─javascript
     │   ├─models
     │   ├─views
     │   ├─commons
     │   ├─libs
     │   │   └─libs.js
     │   ├─pages
     │   │   ├─page1
     │   │   │   └─main.js
     │   │   └─page2
     │   │       └─main.js
     │   └─share
     │       └─share.js
     ├─stylesheet
     │   ├─commons
     │   │   └─common.less
     │   └─pages
     │       ├─page1.css
     │       └─page2.css
     └─assets
````

# Folder explanation

**Note**: you can config all these folder names (except some special ones) by
editing the file `gulp/devdirs.js`. See the below sections for more

- **BASE_DIR**: the working directory, usually the current directory.  
Default: **.**
    - **gulp**: contains all gulp task definitions and config for gulp (do NOT
      change this folder name)
    - **version**: contains the version symlink (see **Versioning** section for more)
    - **source**: contains all the source files  
    Default: source
    - **dist**: contains the files after compilation. Do not put any source
    files for development here.  
    Default: dist

# 2. Getting Started

The project uses Gulp for automation. Make sure that you have installed Nodejs,
Npm, Nodejs. If you are using the company's Vagrant virtual machine, they are
installed already for you. If you want stuff to be easy, just stick with the
tools in Vagrant. Otherwise, you can install Nodejs and Gulp in your local
computer for better performance. All commands used in this document need to be
launched from this folder (regardless of which tools you are using, the Vagrant
ones or the ones in your host computer).

First, install all Gulp dependencies. You only have to this once. In some cases
when you switch branch, there will be error message saying that it could not
find some modules. In that case, you need to delete **node_modules** folder and
run this command again

````console
$ npm install
````

There are some basic tasks that you need to know

- `gulp setup` install all libraries, create symlink for working with
stylesheet, bundle all libraries into one file, compile all javascript file,...
Usually, you will need to run this command for the first time or when you change
branch.

- `gulp clean` clean all compiled files (the dist folder), bower installed
files, symlink,... (everything that can be generated using Gulp)

- `gulp watch` watch for file changes and auto compile them.

- `gulp production` uglify javascript files and minify css files for production.

For Designers, here are the list of things you need to read

- **Naming convention**: you can skip the Javascript part in the Naming
convention
- **Stylesheet**  

For Developers, here are the list of things you need to read

- **Naming convention**
- **Adding new page**
- **Stylesheet**
- **Javascript and Browserify**
- **Adding new Libraries**
- **Live-reload** (optional)

# 3. Naming convention

Each page should have a unique name (to use as its id). The name should not contain
special character as it will be used in the URL. For example: page1,
page2, product-editor,...

## Javascript

- Page Script: are defined in **source/javascript/pages/`page-name`/main.js**.
Each page has its own folder with the name is the `page-name`.

- Share script: are defined in only one file
**source/javascript/share/share.js**.

## Stylesheet

- Page stylesheet are defined in **source/stylesheet/pages/`page-name`.less**.
- Common stylesheet: are defined in only one file
  **source/stylesheet/commons/common.less**.
- Libs stylesheet are defined in **source/stylesheet/libs** in .LESS files.

# 4. Adding new Page

Every time you add new page, create a unique name for it (as mentioned in the
**Naming convention**). Open **gulp/devfiles.js**, find the variable
`PAGE_FOLDERS` and add the name of that page to the array

For example

````js
var PAGE_FOLDERS = ['index', 'user'];
````

In each page, there should be include tag for commons and page stylesheet, libs,
share and page script like this

````html
<link rel="stylesheet" type="text/css" href="/client/dist/stylesheet/commons/common.css">
<link rel="stylesheet" type="text/css" href="/client/dist/stylesheet/pages/{page-name}.css">

<script type="text/javascript" src="/client/dist/javascript/libs/libs.js"></script>
<script type="text/javascript" src="/client/dist/javascript/share/share.js"></script>
<script type="text/javascript" src="/client/dist/javascript/pages/{page-name}/main.js"></script>
````

# 5. Stylesheet

- Stylesheet is defined in .LESS files, not .CSS
- LESS folders are located under **source/stylesheet**.
- Do NOT put any LESS files inside **source/stylesheet** (instead, put in the right
sub folders).
- Do NOT put any CSS files there.

## Common StyleSheet

Common stylesheet is the stylesheet that is used by all pages. They are defined in
**source/stylesheet/commons/common.less** in LESS format. You can add as many LESS files
there as you want. However, there should be one **common.less** file that imports
all those files.

For example, you have stylesheet files for navbar and sidebar

````
commons
 ├─common.less
 ├─navbar.less
 └─sidebar.less
````

In you `common.less` file, import these 2 files like this

````less
@import "navbar.less";
@import "sidebar.less";
````

## Page StyleSheet

Page stylesheet is the stylesheet that is used for only one page. They are
defined in **source/stylesheet/pages/`page-name`.less**. The file name is the
unique page name.

## Libs Stylesheet

Libs stylesheet is the .LESS file imported by other .LESS files. They can be
.LESS file that you write by your own (your LESS functions, mixins,...) or .LESS
file you download from the internet (like Bootstrap LESS file). In any other
files (common and page LESS files), when you want to import, just specify the
name of the file prefixed by `libs/`, no need to use the full path

Ex: you have this library **source/stylesheet/libs/libs1.less**. In your
common1.less file, to import, just write

````css
@import "libs/libs1.less"; // remember the semicolon at the end
````

Usually, in your common.less file, you may want to import Bootstrap. This
project already created short link for Bootstrap, you just need to import like
this

````less
@import "libs/bootstrap/bootstrap.less";
````

## Import CSS

Some libraries provide only css file, not less file. To import that, you need
the `inline` keyword.

````less
@import (inline) "example.css";
````

# 6. Javascript and Browserify

# Pages script

The page script is the main script for each page.
They are stored under **source/javascript/pages**. Inside this
folder, there are several sub-folders that contains script file for each
page. The script file must be named main.js. Each page should (must) have
only one main script file. If you have multiple files, put them in that page's
script folder. In the main script, require them and browserify will bundle them
into main file.

An example of a page script  
**source/javascript/pages/page1/main.js**

````
// browserify libraries
var react = require('react');
var jquery = require('jquery');

// model and view
var view1 = require('views/view1');
var model1 = require('models/model1);

// maybe you have other files inside this folder
var otherModule = require('./otherModule.js');

var model = new model1({
  title: 'my todo',
  completed: true,
  id: 1
});
var view = view1({model: model});

react.renderComponent(view, document.getElementById('content'));
````

You also need to add the page script name (folder name) to the array
`PAGE_FOLDERS` in **gulp/devfiles.js**.

````js
var PAGE_FOLDERS = ['page1', 'page2']; // add the page script folder name
````

After browserified (using `gulp browserify-pages` or `gulp watch`), the bundle
file will be put in  
**dist/javascript/pages/page1/main.js**

````html
<script src="/dist/javascript/pages/page1/main.js"></script>
````

# Share Script

Share script is the executable script that is shared by all pages. It is defined
in **source/javascript/share/share.js**. There should be only one
**share.js** file. If you have many files, just put them inside that **share**
folder and require them into **share.js** file.

- share.js

````js
// require model, view or common
require('commons/common1');
require('commons/common1');

// require other file inside this share folder
require('./share1.js');

// you script here
console.log('aaaaa');
````

After browserified (using `gulp browserify-share` or `gulp watch`), the share
script bundle will be put into  
**dist/javascript/share/share.js**

````html
<script src="/dist/javascript/share/share.js"></script>
````

# Other Browserify folders: Views, Models, Commons

These 3 folders behave in the same way, just the different names. They are used
for importing into other files (using `require()`). For example

````
javascript
 ├─views
 │   ├─view1.js
 │   └─view2.jsx
 ├─models
 │   ├─model1.js
 │   └─model2.js
 └─commons
     ├─common1.js
     └─common2.js
````

In any javascript files (model, view, common, page or share), you can just
load the above files using `require()`. You can also import React JSX file

````js
require('views/view1');
require('views/view2.jsx'); //jsx files need to be imported with file extension
require('models/model1');
require('commons/common1');
````

# Global Objects

Browserify put everything inside its module so you cannot access the function
defined inside those files from the DOM (though you can still interact with the
DOM normally, ex `jquery('#myid')`). In order to access the function from the
DOM, you need to assign it the the global `window` object

````js
function clickHandler(){
  // do something
}
window.clickHandler = clickHandler;
````

````html
<button onclick="clickHandler">Click me</button>
````

# 7. Adding new Libraries

## Install with Bower

The project uses bower for managing and installing front-end libraries.
Bower will install all its packages into **source/bower**.
If you want to change the folder that it installs to, you have to
change in both **gulp/devdirs** and **.bowerrc** files.

- To search for package on bower

````console
bower search name
````

- To install package using bower

````console
bower install --save name
````

- To uninstall bower package

````console
bower uninstall --save name
````

When you finish installing any package from bower, run
`gulp setup` again.

## Linking stylesheet

`gulp setup` automatically create a symlink from
**source/stylesheet/libs/`link-name`** to the package's stylesheet folder for
you to import in your less file. However, because Bower is simply just a
downloader, it cannot know exactly where the stylesheet folder is. You need to
specify it manually. Find this line `var SYMLINKS_MAPPING = {};`. The
`SYMLINKS_MAPPING` is an object with the structure like this

````json
{
  '/absolute/path/to/bootstrap/less': '/absoluate/path/to/libs/bootstrap',
  '/absolute/path/to/jqueryui/css': '/absoluate/path/to/libs/jqueryui',
}
````

The key is the absolute path to the library's stylesheet path and the value is
the absolute path to the place where you want to create the symlink (usually inside
**source/stylesheet/libs**). Run `gulp setup` again to create the symlink

Usually, for Gulp to get the absolute path automatically, you can use
`path.normalize()`, `process.cwd()` and `BASE_DIR` (defined in
**gulp/devdirs.js**, see the **Folder Explanation** section).

````js
SYMLINKS_MAPPING [path.normalize(process.cwd() + '/' +
                                 BASE_DIR.source.bower.path + '/' +
                                 'bootstrap/less')] =
  path.normalize(process.cwd() + '/' +
                 BASE_DIR.source.stylesheet.libs.path +
                 '/bootstrap');
````

Finally, when the symlink is created, you can import it into your less file. For example

````less
@import "libs/bootstrap/bootstrap.less";
@import (inline) "libs/jqueryui/theme.css";
````

## Fixing Library Assets path

Usually, many libraries just use absolute path to its asset files. If the
libraries provide LESS file, you can easily change the LESS variables after
importing. However, for the libraries that offer only CSS file, you need to
manually specify what you want to copy and where you want it to be copied to.
Open **gulp/bower.js** and find this line `var LIBRARY_ASSETS = {};`. The
`LIBRARY_ASSETS` variable is an object with the structure like this

````json
{
  './source/bower/bootstrap/fonts/**/*.*': './dist/stylesheet/fonts',
  './source/bower/jqueryui/themes/images/**/*.*': './dist/stylesheet/commons/images'
}
````

The key is what files you want to copy and the value is where you want those to
be copied to. You can use the `BASE_DIR` variable (defined in
**gulp/devdirs.js**, see the **Folder Explanation** section). For example

````js
LIBRARY_ASSETS [BASE_DIR.source.bower.path + '/bootstrap/fonts/**/*.*'] =
  BASE_DIR.dist.stylesheet.path + '/fonts';
````

Finally, run `gulp setup` again for copy those files to the destination place.

## Bundle Library files into one Lib file

The packages installed from bower contain a metadata file (bower.json) which
indicates the main executable file of that project. When you run `gulp setup`, it
will read that file and then concatenate all the main files into one libs.js
file located in **dist/javascript/libs/libs.js**. In most cases, the metadata
file contains a property for main file, but sometimes it doesn't. In that case,
you need to manually specify the path to all main files that you want to bundle.
Open **gulp/bower.js** and find the line
`var LIBRARY_MAIN_FILES = [...];`. Put the path to all main js files that you
want bundle in this variable. All the path will be calculated relatively from
**source** folder. For example

````js
var LIBRARY_MAIN_FILES = ['bower/jquery/dist/jquery.js',
                          'bower/bootstrap/dist/js/bootstrap.js',
                          'bower/eventEmitter/EventEmitter.js'];
````

## Config Browserify

The final thing you need to do is to config Browserify to recognize the
libraries so that you can use it with the `require()` function.

Open **gulp/browserify-simple.js**, find this line `var LIB_MAP = {...};`. This
is an object for mapping the require module name with the actual global object
you want that require function to return. For example

````js
var LIB_MAP = {
  'jquery': 'window.$',
  'underscore': 'window._',
};
````

In your code, you can load jquery and underscore using the key. The value return
by the `require()` function will be the value

````js
var jquery = require('jquery'); // will return window.$
var underscore = require('underscore'); // will return window._
````

# 8. Live-reload

This is a small utility for auto reloading web page when you make some changes.
The live reload server is started when you run gulp watch task. To add file to
watch for changes and reload, add this to the watch task in gulpfile

````js
gulp.watch('file_to_watch.js').on('change', livereload.changed);
````

By default, the live reload server runs on port 35729.
You also need to add this script
to your page's template to connect to live reload server and refresh the page
when changes happen

````html
<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
````

**Note**: if you are running Gulp from your host machine (not vagrant virtual
machine), the live reload server will run inside that virtual machine. In order
to connect to live reload server, you need to map the live reload server port
from vagrant virtual machine to your hose computer. To do that, open
Vagrantfile, under `Vagrant.configure('2') do |config|` add

````ruby
config.vm.network :forwarded_port, guest: 35729, host: 35729
````

# 9. Util

The project comes with support for Notification when error happens during
compilation process. If you run it from Vagrant virtual machine, of course, it
cannot send the notification. Instead, it only display a red message in the
console. To use the notification, you need to run Gulp from your host machine.
On Mac, you don't have install anything but a version of OSX that supports
Notification center (Mac is great! :) ). On Linux you have to install
`notify-send`. On Windows, you need to install
[Growl for Windows](http://www.growlforwindows.com/gfw/ ).

# 10. Common Errors

## Got error listen EADDRINUSE

**Error message**

```console
... Uhoh. Got error listen EADDRINUSE ...
Error: listen EADDRINUSE
    at errnoException (net.js:901:11)
    at Server._listen2 (net.js:1039:14)
    at listen (net.js:1061:10)
    at Server.listen (net.js:1127:5)
    at Server.listen (/vagrant/client/node_modules/tiny-lr/lib/server.js:138:15)
    at Function.exports.listen (/vagrant/client/node_modules/gulp-livereload/gulp-livereload.js:68:12)
    at Gulp.<anonymous> (/vagrant/client/gulpfile.js:136:14)
    at module.exports (/vagrant/client/node_modules/gulp/node_modules/orchestrator/lib/runTask.js:33:7)
    at Gulp.Orchestrator._runTask (/vagrant/client/node_modules/gulp/node_modules/orchestrator/index.js:273:3)
    at Gulp.Orchestrator._runStep (/vagrant/client/node_modules/gulp/node_modules/orchestrator/index.js:214:10)
```

**Solution**

```console
$ fuser 35729/tcp
35729/tcp:            4775
$ kill 4775
```

The output of the first command (`fuser`) ends with a number, in this case
**4775**. Use that number for the second command (`kill`).
