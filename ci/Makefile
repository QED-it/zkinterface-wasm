all: install build-wasm build-web

build-wasm:
	wasm-pack build --out-dir ../demo/pkg/zkif-wasm-zokrates/     ../zkif-wasm-bundles/zkif-wasm-zokrates
	wasm-pack build --out-dir ../demo/pkg/zkif-wasm-bulletproofs/ ../zkif-wasm-bundles/zkif-wasm-bulletproofs

build-web:
	cd ../demo && npm run build

install:
	cd ../demo && npm install

web-dev:
	cd ../demo && npm run start
