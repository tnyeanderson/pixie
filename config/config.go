package config

import "io/fs"

var ApiBasePath = "/api/v1"

var BaseFilesPath = "data/files"
var BaseScriptsPath = BaseFilesPath + "/scripts"
var BaseImagesPath = BaseFilesPath + "/images"
var FallbackScriptPath = "defaults/shell.ipxe"

var DatabasePath = "data/ipxe-hub.db"

var DefaultFileMode = fs.FileMode(0660)
var DefaultDirMode = fs.FileMode(0770)
