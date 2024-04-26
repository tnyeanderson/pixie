# Pixie

Pixie is a YAML-based utility for managing and auditing PXE booted clients.
Easily create Go templates for iPXE scripts, then render them using arbitrary
variables associated with a boot or device. Requests to the server are logged
using JSON for easy audit ingestion.

Please feel free to open an issue or pull request!

## Getting started

Pixie works by creating a static initial boot image for all PXE booted clients.
This `pixie.kpxe` file [chainloads](https://ipxe.org/howto/chainloading) the
script located at `<PIXIEHOST>/api/v1/device/boot?mac=<MACADDRESS>`, which
resolves to the configured boot script for the device with the provided MAC
address.

Generating the `pixie.kpxe` file requires building iPXE, which requires a fair
amount of dependencies. A docker image is defined here for convenience:

```bash
# Build the docker image used to generate the kpxe file
docker build -f Dockerfile.generate-kpxe -t pixie-kpxe-generator .
```

The generated file will be placed inside the container at `/output/pixie.kpxe`,
and it needs to be placed in the TFTP root directory using volume mounts.

As an example, `data/files` can be used as the `staticroot` path of the
webserver. In this case, bind mount that directory to the `/output` directory
of the container:

```bash
# Create the local directory that the generated file will be copied into
mkdir -p data/files
# Change the pixiehost address below your Pixie server!
docker run -it -v "$(pwd)/data/files:/output" pixie-kpxe-generator 'http://pixiehost:8880'
```

Then, set up your DHCP server:

- Set `next-server` to the IP to your Pixie server
- Set `filename` to the `pixie.kpxe`

Set up your router or DHCP server to boot hosts from `pixie.kpxe`.

Create a YAML config, for example:

```yaml
---
staticroot: "data/files"
httplistener: ":8989"
tftplistener: ":6969"

# Server level variables
vars:
  pixiehost: pixiehost:8880

# Define boots, which associate a boot script to a list of devices.
boots:
- name: ubuntu-22-static
  scriptpath: prod/ubuntu-22-static/boot.ipxe

  # Boot level variables
  vars:
    cloudinit: prod/ubuntu-22-static/cloud-init/
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
├── pixie.yaml
└── files
    ├── pixie.kpxe
    └── prod
        └── ubuntu-22-static
            ├── boot.ipxe
            └── cloud-init
                ├── meta-data
                ├── user-data
                └── vendor-data
```

Then run it!

```bash
PIXIE_CONFIG_FILE=data/pixie.yaml go run .
```
