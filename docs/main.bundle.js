webpackJsonp([2,4],{

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(54)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

module.exports = "<div>\n  Select file to encrypt:\n  <input type=\"file\" (change)=\"encryptFile($event)\">\n  Chunk size:\n  <input type=\"text\" [(ngModel)]=\"chunkEncrypt\">\n</div>\n\n<div>\n  Select file to decrypt:\n  <input type=\"file\" (change)=\"decryptFile($event)\">\n  Chunk size:\n  <input type=\"text\" [(ngModel)]=\"chunkDecrypt\">\n</div>\n\n<button (click)=\"downloadFile()\">Download</button>\n<button (click)=\"getMD5()\">Get MD5 of content</button> {{md5}}\n\n<hr>\n<div>\n  <ul>\n    <li *ngFor=\"let chunk of chunkedFile\">\n      {{ chunk }} | {{chunk.length}}\n    </li>\n  </ul>\n</div>\n"

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(84);


/***/ }),

/***/ 83:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 83;


/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(93);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_md5_dist_md5__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ts_md5_dist_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ts_md5_dist_md5__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppComponent = (function () {
    function AppComponent() {
        this.chunkedFile = Array();
        this.password = 'disPasswordIsSoSec§ur#!';
        this.chunkEncrypt = 20;
        this.chunkDecrypt = 44;
        this.filename = "";
    }
    AppComponent.prototype.encryptFile = function ($event) {
        this.readAndCrypt($event.target.files[0], false, this.chunkEncrypt);
    };
    AppComponent.prototype.decryptFile = function ($event) {
        this.readAndCrypt($event.target.files[0], true, this.chunkDecrypt);
    };
    AppComponent.prototype.getMD5 = function () {
        this.md5 = __WEBPACK_IMPORTED_MODULE_2_ts_md5_dist_md5__["Md5"].hashStr(this.chunkedFile.join(''));
    };
    AppComponent.prototype.readAndCrypt = function (file, decrypt, chunksize) {
        console.log('Filesize: ' + file.size);
        this.filename = file.name;
        for (var i = 0; i < file.size; i = i + chunksize)
            this.readChunk(file, i, i + chunksize, this.chunkedFile, decrypt, this.password);
        console.log("Finished");
    };
    AppComponent.prototype.readChunk = function (file, start, end, ar, decrypt, password) {
        var reader = new FileReader();
        var blob = file.slice(start, end);
        var key = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Base64.parse(password);
        var iv = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Base64.parse("#base64IV#");
        if (decrypt) {
            reader.onloadend = function (e) {
                var decrypted = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].decrypt(reader.result, key, { iv: iv }).toString(__WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Utf8);
                ar.push(decrypted);
                console.log(decrypted);
            };
        }
        else {
            reader.onloadend = function (e) {
                var encrypted = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].encrypt(reader.result, key, { iv: iv }).toString();
                ar.push(encrypted);
                console.log("Chunk size: " + encrypted.length);
            };
        }
        reader.readAsText(blob);
    };
    AppComponent.prototype.downloadFile = function () {
        var content = this.chunkedFile.join('');
        var blob = new Blob([content], { type: 'application/octet-binary' });
        var url = window.URL.createObjectURL(blob);
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, this.filename);
        }
        else {
            var a = document.createElement('a');
            a.href = url;
            a.download = this.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        window.URL.revokeObjectURL(url);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(172),
        styles: [__webpack_require__(171)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(91);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.bundle.js.map