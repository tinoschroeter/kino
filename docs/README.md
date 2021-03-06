# Kino

[![Build Status](https://jenkins.tino.sh/buildStatus/icon?job=kino%2Fmaster)](https://jenkins.tino.sh/job/kino/job/master/)
[![k3s](https://img.shields.io/badge/run%20on%20-Raspberry%20Pi-red)](https://github.com/tinoschroeter/k8s.homelab)
![last-commit](https://img.shields.io/github/last-commit/tinoschroeter/kino.svg?style=flat)
[![GitHub Super-Linter](https://github.com/tinoschroeter/kino/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/tinoschroeter/kino/actions/workflows/linter.yml)

Um schneller gute Filme im Kino oder auf Streaming zu finden, habe ich eine kleine App in nextjs gebaut.

Das ganze läuft  auf meinem [PI Kubernetes Cluster.](https://github.com/tinoschroeter/k8s.homelab)

:popcorn: [kino.tino.sh](https://kino.tino.sh)

## Todo

- [x] Menu Animation
- [x] Secrets einrichten
- [ ] scaper Prometheus push gateway
- [ ] Monitoring
- [x] Image groesse optimieren
- [x] logging
- [x] Sortierung
- [x] Search
- [x] Trailer
- [ ] Login System 
- [ ] EMail System
- [ ] frontend verbessern
- [x] Netfix hinzufügen
- [x] Dammtor Kino hinzufügen
- [ ] refactoring

## tools

* Nextjs
* cheerio
* mongodb
* skaffold
* Kubernetes
* The Movie Database

## env vars

```shell
TMDB_API_KEY
MONGODB_URI
MONGODB_DB
MONGODB_COLLECTION
GITHUB_ID
GITHUB_SECRET
```
