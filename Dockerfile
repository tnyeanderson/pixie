# Compile go
FROM golang AS build-go
RUN mkdir -p /src
WORKDIR /src
COPY src/go.mod src/go.sum ./
RUN go mod download
COPY src/ ./
RUN go build

# Final image
FROM golang
RUN mkdir -p /app
WORKDIR /app
COPY --from=build-go /src/pixie ./pixie
COPY src/defaults ./defaults

ENTRYPOINT [ "/app/pixie", "/app/data/pixie.yaml" ]
