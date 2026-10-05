FROM --platform=linux/amd64 python:3.9.24-alpine3.22

COPY --chown=2000:2000 . /mnt/app

RUN apk add --update --no-cache \
    git \
    ca-certificates \
    curl \
    bash \
    && update-ca-certificates \
    && python3 -m ensurepip \
    && pip3 install --no-cache --upgrade --break-system-packages \
    pip \
    setuptools \
    fastapi \
    pydantic \
    gunicorn \
    uvicorn



RUN mkdir -p /mnt/app && \
    chown 2000:2000 /mnt/app

RUN addgroup -S worker --gid 2000 && \
    adduser -S worker -G worker --uid 2000 --home /mnt/app --gecos ""

WORKDIR /mnt/app

# ENTRYPOINT [ "/bin/bash" ]

EXPOSE 3050
ENTRYPOINT [ "/bin/bash", "-c", "gunicorn api:app -b 0.0.0.0:3050 -k uvicorn.workers.UvicornWorker" ]

