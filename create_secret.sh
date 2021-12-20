#!/bin/bash

kubectl create secret generic passwords \
  --from-literal=TMDB_API_KEY=1234 \
  --from-literal=MONGODB_URI=mongodb+srv \
  -o yaml
