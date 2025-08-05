package pixie

import "fmt"

func Example_sanitizeMac() {
	for _, in := range []string{
		"AABBCCDDEEFF",
		"11-22-33-44-55-66",
		"11:22:33:44:55:66",
		"aa:bb:cc:dd:ee:ff",
	} {
		out, _ := sanitizeMac(in)
		fmt.Println(out)
	}

	// Output:
	// AA:BB:CC:DD:EE:FF
	// 11:22:33:44:55:66
	// 11:22:33:44:55:66
	// AA:BB:CC:DD:EE:FF
	//
}
