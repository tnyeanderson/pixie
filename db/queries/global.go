package queries

import "github.com/tnyeanderson/pixie/utils"

func LogLastAccessed(fullpath string) {
	if utils.IsScriptPath(fullpath) {
		UpdateScriptLastAccessedByPath(fullpath)
	} else if utils.IsImagePath(fullpath) {
		UpdateImageLastAccessedByPath(fullpath)
	}
}
