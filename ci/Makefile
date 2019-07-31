echo executing makefile

all: install build-wasm build-web

build-wasm:
	echo building wasm:
	wasm-pack build --out-dir ../../demo/pkg/zkif-wasm-zokrates/     ../zkif-wasm-bundles/zkif-wasm-zokrates
	wasm-pack build --out-dir ../../demo/pkg/zkif-wasm-bulletproofs/ ../zkif-wasm-bundles/zkif-wasm-bulletproofs

build-web:
	echo build-web:
	cd ../demo && npm run build

install:
	echo install:
	cd ../demo && npm install

web-dev:
	echo web-dev:
	cd ../demo && npm run start
