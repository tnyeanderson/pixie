package pixie

import (
	"fmt"
	"regexp"
	"strings"
)

var validMacRegexp = regexp.MustCompile(`^[0-9A-F]{12}$`)

func sanitizeMac(mac string) (string, error) {
	mac = strings.ReplaceAll(mac, ":", "")
	mac = strings.ReplaceAll(mac, "-", "")
	mac = strings.ToUpper(mac)

	if !validMacRegexp.Match([]byte(mac)) {
		return "", fmt.Errorf("invalid mac address")
	}

	octets := []string{}
	for i := 0; i < 12; i += 2 {
		octets = append(octets, mac[i:i+2])
	}
	return strings.Join(octets, ":"), nil
}
