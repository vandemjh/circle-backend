FROM node
RUN mkdir -p /serve
WORKDIR /serve
COPY package.json /serve
# RUN npm cache clean
RUN npm install
COPY . /serve
EXPOSE 3000
RUN npm test
CMD ["npm", "start", "--prod"]
