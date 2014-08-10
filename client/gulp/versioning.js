var fs = require('fs');
var path = require('path');
var git = require('git-rev');
var gulp = require('gulp');
var BASE_DIR = require('./devdirs.js').BASE_DIR;

////////////////////////////////////////////////////////////////////////////////
// Versioning config
var VERSION_FILE_NAME = 'version';

gulp.task('update-version', function(){

  // calculate the version based on the commit hash
  git.long(function(version){
    // source of the symlink
    var distPath = path.normalize(process.cwd() + '/' + BASE_DIR.dist.path);
    // dest of the symlink
    var versionPath = path.normalize(process.cwd() + '/' +
                                     BASE_DIR.version.path + '/' + version);
    // the file to write the version
    var versionFile = path.normalize(process.cwd() + '/' +
                                     BASE_DIR.version.path + '/' + VERSION_FILE_NAME);

    // delete the dest symlink
    if(fs.existsSync(versionPath))
      fs.unlinkSync(versionPath);

    // delete the version file
    if(fs.existsSync(versionFile))
      fs.unlinkSync(versionFile);
    
    // sym link
    fs.symlinkSync(distPath, versionPath);

    // write the version to file (can be database later if needed)
    fs.writeFileSync(versionFile, version);
  });
  
});
