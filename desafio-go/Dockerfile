###############
## STAGE 01: ##
###############
FROM golang:alpine AS BUILDER

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .


###############
## STAGE 02: ##
###############
FROM scratch

COPY --from=BUILDER /app/app /app

ENTRYPOINT ["/app"]