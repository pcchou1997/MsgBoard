FROM node:19.4.0 
#載入 Node.js 需要的執行環境

#在這個 Docker 的環境之中建立一個工作目錄 /usr/src/app
WORKDIR /app

# install app dependencies
COPY . /app
#運行 npm install，讓 npm 透過讀取 package.json 下載相依的 package
RUN npm install

EXPOSE 3000
CMD node server.js