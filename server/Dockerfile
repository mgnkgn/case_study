FROM postgres:latest

ENV POSTGRES_PASSWORD=depixen-pass
ENV POSTGRES_DB=postgres

EXPOSE 5439


CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]