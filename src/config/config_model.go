package config

type ConfigModel struct {
	Paths struct {
		ConfigFile     string
		Api            string
		FileServer     string
		FallbackScript string
		WebRoot        string
		Database       string
	}
	AccessModes struct {
		FileDefault uint32
		DirDefault  uint32
	}
}
