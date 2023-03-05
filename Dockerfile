# Build angular app
FROM node:lts-slim AS build-angular
RUN mkdir -p /web
WORKDIR /web
COPY web/package-lock.json web/package.json /web/
RUN npm ci
COPY web/ /web
RUN npm run build

# Compile go
FROM golang AS build-go
RUN mkdir -p /src
WORKDIR /src
COPY src/go.mod src/go.sum ./
RUN go mod download
# This package takes a while to compile. Cache for speed
RUN go install gorm.io/driver/sqlite
COPY src/ ./
RUN go build

# Final image
FROM golang
RUN mkdir -p /app
WORKDIR /app
COPY --from=build-go /src/pixie ./pixie
COPY --from=build-angular /web/dist ./web/dist
COPY src/defaults ./defaults

ENTRYPOINT [ "/app/pixie", "/app/data/pixie.yaml" ]
