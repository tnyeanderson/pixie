#!/bin/bash

read -rd '' USAGE <<EOF

Generate a chainloaded iPXE BIOS image to boot by default.
Sends clients to pixie to retrieve their boot script.
This might take a while!

Usage: ${0} <OUTPUT_DIR> <PIXIE_HOST>

EOF

usage() {
	echo
	echo "$USAGE"
	echo
}

OUTPUT_DIR=$1
PIXIE_HOST=$2

if [[ -z "$PIXIE_HOST" ]]; then
	echo >&2 'ERROR: Must set a PIXIE_HOST'
	usage
	exit 1
fi

if [[ -z "$OUTPUT_DIR" ]]; then
	echo >&2 'ERROR: Must set a OUTPUT_DIR'
	usage
	exit 1
fi

git clone https://github.com/ipxe/ipxe.git || exit 2

cd ipxe/src || exit 2

echo "Generating chain.ipxe ..."
echo

echo '========================='

tee chain.ipxe <<EOF
#!ipxe
  
dhcp
chain ${PIXIE_HOST}/boot/\${net0/mac}
EOF

echo '========================='
echo

echo "Starting build... this could take a while!"
echo

make bin-x86_64-efi/snponly.efi EMBED=chain.ipxe || exit 3
make bin/undionly.kpxe EMBED=chain.ipxe || exit 3

echo
echo "Successfully generated iPXE chainload image"

OUTPUT_EFI="${OUTPUT_DIR}/pixie.efi"
OUTPUT_KPXE="${OUTPUT_DIR}/pixie.kpxe"
cp bin-x86_64-efi/snponly.efi "${OUTPUT_EFI}"
cp bin/undionly.kpxe "${OUTPUT_KPXE}"

echo
echo "${OUTPUT_EFI}"
echo "${OUTPUT_KPXE}"
echo
