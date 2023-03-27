FROM node:latest

RUN npm i -g ganache

CMD ganache --wallet.deterministic --miner.blockGasLimit 8000000 --server.host 0.0.0.0 --server.port 8546 --fork.url https://mainnet.infura.io/v3/d119148113c047ca90f0311ed729c466 --chain.chainId 1
