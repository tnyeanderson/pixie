package utils

import (
	"encoding/json"
	"errors"
	"net/http"
	"regexp"
	"strings"
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
	return sanitized, nil
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
	check, err := regexp.Compile(`^[0-9A-Za-z-_\s\.]+$`)
	if err != nil {
		return false, err
	}

	if !check.Match([]byte(slug)) || TraversesParent(slug) {
		return false, errors.New("invalid slug")
	}
	return true, nil
}

func ValidatePath(path string) (bool, error) {
	check, err := regexp.Compile(`^[/0-9A-Za-z-_\s\.]+$`)
	if err != nil {
		return false, err
	}

	if !check.Match([]byte(path)) || TraversesParent(path) {
		return false, errors.New("invalid path")
	}
	return true, nil
}

func TraversesParent(path string) bool {
	return strings.Contains(path, "..")
}
