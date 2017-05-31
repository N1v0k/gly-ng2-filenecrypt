import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private chunkedFile = Array<String>();
  private password = 'disPasswordIsSoSec§ur#!';
  private chunkEncrypt = 20;
  private chunkDecrypt = 44;
  private md5: string|Int32Array;
  private filename: string = "";

  encryptFile($event) : void {
    this.readAndCrypt($event.target.files[0],false,this.chunkEncrypt);
}

  decryptFile($event) : void {
    this.readAndCrypt($event.target.files[0],true,this.chunkDecrypt);
  }

  getMD5(){
    this.md5 = Md5.hashStr(this.chunkedFile.join(''));
  }

  readAndCrypt(file: File, decrypt: boolean, chunksize) : void {
    console.log('Filesize: ' +  file.size);
    this.filename = file.name;

    for (let i = 0; i < file.size; i=i+chunksize)
      this.readChunk(file,i,i+chunksize,this.chunkedFile,decrypt,this.password);

    console.log("Finished");
  }

  readChunk(file,start,end, ar: Array<String>,decrypt: boolean,password) {
    const reader = new FileReader();
    const blob = file.slice(start, end);

    const key = CryptoJS.enc.Base64.parse(password);
    const iv  = CryptoJS.enc.Base64.parse("#base64IV#");

    if(decrypt){
      reader.onloadend = function (e) {
        let decrypted = CryptoJS.AES.decrypt(reader.result,key, {iv: iv}).toString(CryptoJS.enc.Utf8);
        ar.push(decrypted);
        console.log(decrypted);
      };
    } else {
      reader.onloadend = function (e) {
        let encrypted = CryptoJS.AES.encrypt(reader.result, key, {iv: iv}).toString();
        ar.push(encrypted);
        console.log("Chunk size: " + encrypted.length);
      };
    }
    reader.readAsText(blob);
  }

  downloadFile() {
    let content = this.chunkedFile.join('');
    let blob = new Blob([content], { type: 'application/octet-binary' });
    let url = window.URL.createObjectURL(blob);

    if(navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, this.filename);
    } else {
      let a = document.createElement('a');
      a.href = url;
      a.download = this.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
}
