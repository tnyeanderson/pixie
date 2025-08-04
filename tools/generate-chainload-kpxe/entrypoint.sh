#!/bin/bash

set -e

read -rd '' USAGE <<EOF || true

Generate a chainloaded iPXE BIOS image to boot by default.
Sends clients to pixie to retrieve their boot script.
This might take a while!

Usage: ${0} <output_dir> <pixie_domain> <pixie_port>

EOF

usage() {
	echo
	echo "$USAGE"
	echo
}

output_dir=$1
pixie_domain=$2
pixie_port=$3

for var in output_dir pixie_domain pixie_port; do
	if [[ -z "${!var}" ]]; then
		usage
		echo "error: must set $var" >&2
		exit 1
	fi
done

if [[ -z "$PIXIE_CERT_PATH" ]]; then
	if [[ -f "$output_dir/server.key" ]] && [[ -f "$output_dir/server.crt" ]]; then
		echo "warning: TLS certificate already exists, skipping"
	else
		openssl req -x509 -newkey rsa:4096 \
			-keyout "$output_dir/server.key" -out "$output_dir/server.crt" \
			-days 3650 -nodes -batch \
			-subj "/CN=$pixie_domain"
	fi
	PIXIE_CERT_PATH="$output_dir/server.crt"
fi

git clone https://github.com/ipxe/ipxe.git || exit 2

cd ipxe/src || exit 2

echo "Generating chain.ipxe ..."
echo

echo '========================='

tee chain.ipxe <<EOF
#!ipxe

dhcp
chain --replace https://${pixie_domain}:${pixie_port}/boot/\${net0/mac}
EOF

echo '========================='
echo

# Enable HTTPS
sed -i 's/.*DOWNLOAD_PROTO_HTTPS.*/#define DOWNLOAD_PROTO_HTTPS/g' config/general.h

echo "Starting build... this could take a while!"
echo

make bin/undionly.kpxe TRUST="$PIXIE_CERT_PATH" EMBED=chain.ipxe || exit 3

echo
echo "Successfully generated iPXE chainload image"

output_file="${output_dir}/pixie.kpxe"
cp bin/undionly.kpxe "${output_file}"

echo
echo "${output_file}"
echo
