FROM  node:latest

WORKDIR /usr/src/splitwise-backend

COPY package*.json ./

RUN npm install
RUN npm install --save pg sequelize sequelize-cli

# COPY . .

EXPOSE 8000

CMD [ "./run-backend.sh" ]