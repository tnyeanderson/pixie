package queries

import (
	"github.com/tnyeanderson/pixie/config"
	"github.com/tnyeanderson/pixie/utils"
)

func LogLastAccessed(fullpath string) {
	if utils.IsScriptPath(fullpath, config.Pixie) {
		UpdateScriptLastAccessedByPath(fullpath)
	} else if utils.IsImagePath(fullpath, config.Pixie) {
		UpdateImageLastAccessedByPath(fullpath)
	} else if utils.IsCloudConfigPath(fullpath, config.Pixie) {
		UpdateCloudConfigLastAccessedByPath(fullpath)
	}
}
