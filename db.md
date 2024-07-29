## Database

Set up database by running

```bash
docker-compose up -d
```

Get CONTAINER ID by running

```bash
docker ps
```

Initialize database tables by running

```bash
docker exec -i <container_id> psql -U admin -d sticker_db < db-init.sql
```

where `<container_id>` is the id of the container
