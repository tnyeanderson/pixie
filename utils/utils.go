package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
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

func WriteJson(rw http.ResponseWriter, b interface{}) {
	body, err := json.Marshal(b)
	if err != nil {
		http.Error(rw, "Error marshalling result to JSON", 500)
		return
	}

	rw.Header().Set("Content-Type", "application/json")
	rw.Write(body)
}

func ParseJson(target interface{}, rw http.ResponseWriter, r *http.Request) (interface{}, error) {
	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(rw, "Content Type is not application/json", http.StatusUnsupportedMediaType)
		return nil, errors.New("wrong content type")
	}
	var unmarshalErr *json.UnmarshalTypeError

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(target)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			http.Error(rw, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			http.Error(rw, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return nil, errors.New("bad request")
	}

	return target, nil
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

func IsScriptPath(fullpath string) bool {
	return strings.HasPrefix(fullpath, config.Pixie.Paths.Scripts)
}

func IsImagePath(fullpath string) bool {
	return strings.HasPrefix(fullpath, config.Pixie.Paths.Images)
}

func GetRelativeImagePath(fullpath string) string {
	prefix := config.Pixie.Paths.Images + "/"
	return strings.TrimPrefix(fullpath, prefix)
}

func GetRelativeScriptPath(fullpath string) string {
	prefix := config.Pixie.Paths.Scripts + "/"
	return strings.TrimPrefix(fullpath, prefix)
}
