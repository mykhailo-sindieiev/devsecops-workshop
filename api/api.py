import os
from fastapi import FastAPI, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from urllib.parse import urlparse
import logging

logger = logging.getLogger(__name__)

logging.basicConfig(level=logging.INFO)

# To run the API server:
# Run the docker-compose with mysql and redis
# set -a --allexport
# source .env
# set +a --allexport
# gunicorn api:app -b 0.0.0.0:8000 -k uvicorn.workers.UvicornWorker

class ScanRequest(BaseModel):
    name: str
    surname: str
    comment: str
    email: str
    check: str


app = FastAPI(title="SomeBackend",
              description="Backend API",
              version="1.0.0",
              contact={
                  "name": "Mykhailo Sindieiev",
                  "email": "m.sindeev@gmail.com",
              })


@app.post("/api/v1/backend", status_code=200)
async def run_scanners(request: ScanRequest, response: Response):
    logger.info(request)
    return {"data": request}
