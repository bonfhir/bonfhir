FROM mcr.microsoft.com/devcontainers/typescript-node:0-18-bullseye

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends nginx \
    && apt-get clean

# Let's make sure to use a supported version of node
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install 18.16.0 && nvm use 18.16.0 && npm i -g pnpm"

# Default ZSH configuration only load the git plugin. This adds yarn as well.
RUN su node -c "sed -i 's/plugins=(git)/plugins=(git yarn)/' ~/.zshrc"

# Persist ZSH history
RUN mkdir /command_history \
 && touch /command_history/.zsh_history \
 && chown -R node /command_history

# Touch node_modules mounted as volumes
RUN mkdir -p /workspace/node_modules \
 && mkdir -p /workspace/packages/docs/node_modules \
 && chown -R node /workspace

# Proxy localhost:8103 in devcontainer to medplum:8103 to allow symmetric medplum addressing
# We use nginx to do so
RUN unlink /etc/nginx/sites-enabled/default \
    && echo "server { listen 8103; location / { proxy_pass http://medplum:8103; }}" >> /etc/nginx/sites-available/medplum-proxy \
    && link /etc/nginx/sites-available/medplum-proxy /etc/nginx/sites-enabled/medplum-proxy
