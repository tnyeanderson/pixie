# pixie

`pixie` is a YAML-based utility for managing and auditing PXE booted clients.
Easily create Go templates for iPXE scripts, then render them using arbitrary
variables associated with a boot or device. Requests to the server are logged
using JSON for easy auditing.

Please feel free to open an issue or pull request!

## Getting started

> NOTE: By default, pixie listens on ports 8880 (HTTP) and 69 (TFTP).

pixie works by creating a static initial boot image for all PXE booted clients.
This `pixie.kpxe` file [chainloads](https://ipxe.org/howto/chainloading) the
script located at `<PIXIEHOST>/boot/<MACADDRESS>`, which
resolves to the configured boot script for the device with the provided MAC
address.

Generating the `pixie.kpxe` file requires building iPXE, which requires a fair
amount of dependencies. A docker image is defined here for convenience:

```bash
# Build the docker image used to generate the kpxe file
docker build -t pixie-kpxe-generator tools/generate-chainload-kpxe
```

The generated file will be placed inside the container at `/output/pixie.kpxe`,
and it needs to be placed in the TFTP root directory using volume mounts.

As an example, `data/files` can be used as the `staticroot` path of the
webserver. In this case, bind mount that directory to the `/output` directory
of the container:

```bash
# Create the local directory that the generated file will be copied into
mkdir -p data/files
# Change the pixiehost address below your pixie server!
docker run -it -v "$(pwd)/data/files:/output" pixie-kpxe-generator 'http://pixiehost:8880'
```

Then, set up your DHCP server (see `man dhcpd.conf`):

- Set `next-server` to the IP to your pixie server
- Set `filename` to the `pixie.kpxe`

Set up your router or DHCP server to boot hosts from `pixie.kpxe`.

Create a YAML config, for example:

```yaml
---
staticroot: "data/files"

# These are the default values
#httplistener: ":8880"
#tftplistener: ":69"

# Server level variables
vars:
  pixiehost: pixiehost:8880

# Define boots, which associate a boot script to a list of devices.
boots:
- name: ubuntu-22-static
  scriptpath: boots/ubuntu/boot.ipxe

  # Boot level variables
  vars:
    cloudinit: boots/ubuntu/cloud-init/
    eth_interface: enp0s31f6

  devices:
  - name: h1
    mac: 11:11:11:11:11:11
    vars:
      ip: 10.0.0.10
      hostname: h2

  - name: h2
    mac: 22:22:22:22:22:22
    vars:
      ip: 10.0.0.20
      hostname: h2
      # Overrides the boot level variable
      eth_interface: ens18
```

Then set up your artifacts using whatever structure you prefer, according to
your config:

```
data/
├── files
│   ├── pixie.kpxe
│   ├── boots
│   │   └── ubuntu
│   │       ├── boot.ipxe
│   │       └── cloud-init
│   │           ├── meta-data
│   │           ├── user-data
│   │           └── vendor-data
│   └── ubuntu-22.04
│       ├── initrd
│       ├── ubuntu-22.04.1-live-server-amd64.iso
│       ├── user-data
│       └── vmlinuz
└── pixie.yaml
```

Then run it!

```bash
PIXIE_CONFIG_FILE=data/pixie.yaml go run .
```

Alternatively, use `docker compose`:

```bash
# Be sure to set staticpath to /app/data/files
docker compose build
docker compose up
```

## How it works

In the above example, let's say `data/files/boots/ubuntu/boot.ipxe` looks like
this:

```
#!ipxe

set name {{.Device.Name}}
set render http://{{.Vars.pixiehost}}/render/{{.Device.Mac}}
set ubuntu http://{{.Vars.pixiehost}}/static/ubuntu-22.04

kernel ${ubuntu}/vmlinuz cloud-config-url=/dev/null url=${ubuntu}/ubuntu-22.04.1-live-server-amd64.iso initrd=initrd ip=dhcp toram autoinstall ds=nocloud-net;s=${render}/{{.Vars.cloudinit}}

initrd ${ubuntu}/initrd

boot
```

> NOTE: The `set` directives assign iPXE variables based on rendered values
from the Go template. These variables are then used later in the boot script,
for example `${ubuntu}`.

When `11:11:11:11:11:11` goes to boot from the network, the `pixie.kpxe` script
will be booted, which will chainload the script at
`/boot/11:11:11:11:11:11`. That templated script will look
like:

```
#!ipxe

set name h1
set render http://pixiehost:8880/render/11:11:11:11:11:11
set ubuntu http://pixiehost:8880/static/ubuntu-22.04

kernel ${ubuntu}/vmlinuz cloud-config-url=/dev/null url=${ubuntu}/ubuntu-22.04.1-live-server-amd64.iso initrd=initrd ip=dhcp toram autoinstall ds=nocloud-net;s=${render}/{{.Vars.cloudinit}}

initrd ${ubuntu}/initrd

boot
```

That script will boot over the network using the provided Ubuntu 22 artifacts,
and the cloud-init files from `data/files/boots/ubuntu/cloud-init` will be
rendered using Go templates and provided to the machine for initialization.

If the MAC address isn't configured in pixie, the default iPXE script will be
sent, which simply opens a shell. The request will appear in the logs so you
can easily add it to your config.
