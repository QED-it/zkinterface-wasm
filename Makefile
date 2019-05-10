build:
	wasm-pack build --out-dir ../www/pkg/zkif-wasm-example/      zkif-wasm-example
	wasm-pack build --out-dir ../www/pkg/zkif-wasm-bulletproofs/ zkif-wasm-bulletproofs

web-dev:
	cd www && npm run start
