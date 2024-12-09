#!/bin/bash
# Fetch the latest OpenAPI schema
curl http://127.0.0.1:8080/openapi.json -o src/api/openapi-schema.json

# Generate TypeScript client code
npx openapi-typescript-codegen --input src/api/openapi-schema.json --output src/api --client axios
