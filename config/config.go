package config

import "io/fs"

var ApiBasePath = "/api/v1"

var BaseDataPath = "data"
var BaseFilesPath = BaseDataPath + "/files"
var BaseScriptsPath = BaseFilesPath + "/scripts"
var BaseImagesPath = BaseFilesPath + "/images"
var FallbackScriptPath = "defaults/shell.ipxe"
var WebRootPath = "web/dist/html"

var DatabasePath = "data/ipxe-hub.db"

var DefaultFileMode = fs.FileMode(0660)
var DefaultDirMode = fs.FileMode(0770)
