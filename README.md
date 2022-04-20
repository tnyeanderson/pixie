# Pixie

Web interface for managing PXE booted clients

PROJECT IS IN ALPHA. MORE DOCUMENTATION AND FUNCTIONALITY TO COME

## Features
- [x] TFTP server (no docker support yet)
- [x] Web interface & HTTP API
- [x] Chainload iPXE boot image generator
- [x] Upload/manage scripts and boot images
- [x] Devices which try to network boot are added to the database
- [x] Assign a default boot script
- [x] Assign scripts to devices
- [x] Logging (audit trail)
- [ ] Upload/manage config files (ignition, clout-init, etc)
- [ ] Config file (ignition, clout-init, etc) handlebars templating
- [ ] Build a boot script (select images, config) with a GUI
- [ ] Authentication (RBAC?)
- [ ] Groups (assign a script/config to a group of devices)
- [ ] Boot script handlebars templating
- [ ] Library of boots (ex: ubuntu, debian, coreos, etc) that can be "imported" and modified
- [ ] Temporarily boot another script for testing/debugging (for x number of boots, or y seconds, etc)

## Getting started
First, generate a `pixie.kpxe` file that will be the default boot image sent by the DHCP server. The URL used below will be the [chainloaded](https://ipxe.org/howto/chainloading) host.

This requires building iPXE which requires a fair amount of dependencies. A docker image is defined here for convenience:
```bash
# Build the docker image we will use to generate the kpxe file
docker build -f Dockerfile.generate-kpxe -t pixie-kpxe-generator .
```

The generated file will be placed inside the container at `/output/pixie.kpxe`, and it needs to be placed in the TFTP root directory using volume mounts.

If using the default configuration, `Paths.FileServer` (the TFTP root) is `data/files`, so this will be used as an example.
```bash
# Create the local directory that the generated file will be copied into
mkdir -p data/files
# Change the localhost address below to a resolvable host!
docker run -it -v "$(pwd)/data/files:/output" pixie-kpxe-generator 'http://localhost:8880'
```

Then, run the app!

## Run locally
Since a TFTP server is included, `sudo` must be used.
```bash
$ (cd web/ && ng build) ; sudo go run main.go
```

Then navigate to `localhost:8880` in a browser.

## Run using docker
```bash
docker-compose up -d
```
> NOTE: TFTP is not functional in docker at the moment due to how TFTP uses ports.

Then navigate to `localhost:8880` in a browser.
