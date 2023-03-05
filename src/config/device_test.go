package config

import "fmt"

func ExamplePrintScript() {
	config := Config{}
	config.Load("testdata/pixie.yaml")
	d, _ := config.Resolved["00:00:00:00:01:11"]
	s, _ := d.RenderScript(config.StaticRoot)
	fmt.Println(s)

	// Output:
	// #!ipxe
	//
	// set name h4
	// set ubuntu http://10.0.0.1:8880/static/ubuntu-22.04
	// set docker http://10.0.0.1:8880/static/docker-hosts-test
	//
	// kernel ${ubuntu}/vmlinuz cloud-config-url=/dev/null url=${ubuntu}/ubuntu-22.04.1-live-server-amd64.iso initrd=initrd ip=dhcp toram autoinstall ds=nocloud-net;s=testdata/cloud-init/
	//
	// initrd ${ubuntu}/initrd
	//
	// boot
}
