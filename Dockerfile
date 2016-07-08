FROM node:5.9.1

# RUN ulimit -n 1000 && \
#     apt-get update && \
#     apt-get install -y nginx
#
ENV TERM=xterm
ENV ROOT /var/www/app

# # make this cache-able
# RUN mkdir -p $ROOT/dist && \
#     mkdir -p $ROOT/src
# COPY package.json $ROOT/src/
#
COPY . $ROOT/src/
WORKDIR $ROOT/src
RUN npm install --loglevel=warn

# build & test
RUN npm run build && npm run test

# start sever
CMD ./run.sh
