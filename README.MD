# SF Finance Dashboard

This project is done as a practice to get familiar with Solana Network, as well as StreamFlow - a token distribution platform powered by a streaming payments' protocol.

## Project Setup

### Clone the repository locally

```sh
$ git clone git@github.com:ognjenjevremovic/sf-streaming-payments.git
$ cd ./sf-streaming-payments
```

### Install the dependencies

```sh
$ npm ci
```

### Create `.env.` file _(Optional)_

```sh
$ mv .env.template .env
```

And populate the `VITE_SOLANA_NETWORK` value with either `devnet` or `testnet`, depending on the network you would like to run the project agains.  
_Default value if not provided (or invalid) - `devnet`_

### Start Development Server

```sh
$ npm run dev
```

### License

MIT.  
See [LICENSE](./LICENSE) for details.
