package utils

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"github.com/tnyeanderson/pixie/config"
)

func SanitizeMac(mac string) (string, error) {
	re, err := regexp.Compile(`[:-]`)
	if err != nil {
		return "", err
	}
	check, err := regexp.Compile(`^[0-9A-F]{12}$`)
	if err != nil {
		return "", err
	}

	sanitized := strings.ToUpper(re.ReplaceAllString(mac, ""))
	if !check.Match([]byte(sanitized)) {
		return "", errors.New("invalid mac address")
	}

	return FormatMac(sanitized), nil
}

func FormatMac(mac string) string {
	var out []string
	for i := 0; i < 12; i += 2 {
		out = append(out, mac[i:i+2])
	}
	return strings.Join(out, ":")
}

func ValidateSlug(slug string) (bool, error) {
	check := regexp.MustCompile(`^[0-9A-Za-z-_\s\.]+$`)

	if !check.Match([]byte(slug)) || TraversesParent(slug) {
		return false, errors.New("invalid slug")
	}
	return true, nil
}

func ValidatePath(path string) (string, error) {
	check := regexp.MustCompile(`^[/0-9A-Za-z-_\s\.]+$`)

	if !check.Match([]byte(path)) || TraversesParent(path) {
		return path, errors.New("invalid path")
	}
	return SanitizePath(path), nil
}

func SanitizePath(path string) string {
	re := regexp.MustCompile(`^/`)
	path = re.ReplaceAllString(path, "")
	return path
}

func TraversesParent(path string) bool {
	return strings.Contains(path, "..")
}

func GetFilesRecursive(basePath string) ([]string, error) {
	out := []string{}
	err := filepath.Walk(basePath,
		func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}
			if !info.IsDir() {
				out = append(out, strings.Replace(path, basePath+"/", "", -1))
			}
			return nil
		})
	if err != nil {
		return nil, err
	}
	return out, nil
}

func GetUniqueArrayDiff(src []string, target []string) ([]string, []string) {
	// NOTE: src and target must each be unique!

	// Maps are an efficient way to check for intersection
	tmpMap := make(map[string]int)

	// Store the common indexes for each array
	srcShared := []int{}
	targetShared := []int{}

	for s, srcItem := range src {
		tmpMap[srcItem] = s
	}

	for t, targetItem := range target {
		if s, ok := tmpMap[targetItem]; ok {
			// Index is present in both arrays
			srcShared = append(srcShared, s)
			targetShared = append(targetShared, t)
		}
	}

	// Values only present in target have been added to src
	added := RemoveIndexesFromArray(target, targetShared)
	// Values only present in src have been deleted in target
	deleted := RemoveIndexesFromArray(src, srcShared)

	return added, deleted
}

func RemoveIndexesFromArray(arr []string, indexes []int) []string {
	// Sort descending so we don't mess up the order
	sort.Sort(sort.Reverse(sort.IntSlice(indexes)))
	for _, i := range indexes {
		arr = append(arr[:i], arr[i+1:]...)
	}
	return arr
}

func GetNextName(name string, existingNames []string) string {
	counter := 0
	for {
		found := false
		possibleName := name
		if counter > 0 {
			possibleName = name + " " + fmt.Sprint(counter)
		}
		for _, existingName := range existingNames {
			if existingName == possibleName {
				found = true
				counter++
				break
			}
		}
		if !found {
			return possibleName
		}
	}
}

func IsScriptPath(fullpath string, config config.ConfigModel) bool {
	prefix := config.Paths.Scripts + "/"
	return strings.HasPrefix(fullpath, prefix)
}

func IsImagePath(fullpath string, config config.ConfigModel) bool {
	prefix := config.Paths.Images + "/"
	return strings.HasPrefix(fullpath, prefix)
}

func IsCloudConfigPath(fullpath string, config config.ConfigModel) bool {
	prefix := config.Paths.CloudConfigs + "/"
	return strings.HasPrefix(fullpath, prefix)
}

func GetRelativeImagePath(fullpath string, config config.ConfigModel) string {
	prefix := config.Paths.Images + "/"
	return strings.TrimPrefix(fullpath, prefix)
}

func GetRelativeScriptPath(fullpath string, config config.ConfigModel) string {
	prefix := config.Paths.Scripts + "/"
	return strings.TrimPrefix(fullpath, prefix)
}

func GetRelativeCloudConfigPath(fullpath string, config config.ConfigModel) string {
	prefix := config.Paths.CloudConfigs + "/"
	return strings.TrimPrefix(fullpath, prefix)
}
