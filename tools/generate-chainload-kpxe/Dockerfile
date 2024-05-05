# Build pixie.kpxe
FROM ubuntu:20.04
WORKDIR /build
RUN apt-get update && \
    apt-get install -y \
        git \
        gcc \
        binutils \
        make \
        perl \
        liblzma-dev \
        mtools
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
RUN mkdir /output
ENTRYPOINT [ "/build/entrypoint.sh", "/output" ]
