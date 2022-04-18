# Pixie

Web interface for managing PXE booted clients

PROJECT IS IN ALPHA. MORE DOCUMENTATION AND FUNCTIONALITY TO COME

## Getting started
Since a TFTP server is included, `sudo` must be used.
```bash
$ (cd web/ && ng build) ; sudo go run main.go
```

Or use docker:
```
docker-compose build && docker-compose up -d
```
> NOTE: TFTP is not functional in docker at the moment due to how TFTP uses ports.

Then navigate to `localhost:8880` in a browser.
