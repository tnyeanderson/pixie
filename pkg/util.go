package pixie

import (
	"fmt"
	"regexp"
	"strings"
)

func sanitizeMac(mac string) (string, error) {
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
		return "", fmt.Errorf("invalid mac address")
	}

	return formatMac(sanitized), nil
}

func formatMac(mac string) string {
	var out []string
	for i := 0; i < 12; i += 2 {
		out = append(out, mac[i:i+2])
	}
	return strings.Join(out, ":")
}
