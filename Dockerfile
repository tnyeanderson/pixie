# Compile go
FROM golang AS build-go
RUN mkdir -p /src
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . ./
RUN CGO_ENABLED=0 go build .

# Final image
FROM golang
RUN mkdir -p /app
WORKDIR /app
COPY --from=build-go /src/pixie ./pixie

ENV PIXIE_CONFIG_FILE="/app/data/pixie.yaml"

ENTRYPOINT [ "/app/pixie" ]
