
#
# Harness a publicly available LibreOffice docker image to run a command.
#
# Thanks!
#
# https://www.linuxserver.io/
# https://fleet.linuxserver.io/image?name=linuxserver/libreoffice
# https://hub.docker.com/r/linuxserver/libreoffice
#

# LibreOffice container
FROM lscr.io/linuxserver/libreoffice:latest

# Copy from action repo to container root.
COPY entrypoint.sh /entrypoint.sh

# Execute this when Docker container starts
ENTRYPOINT ["/entrypoint.sh"]

