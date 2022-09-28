package queries

func LogLastAccessed(fullpath string) {
	UpdateFileLastAccessedByPath(fullpath)
}
