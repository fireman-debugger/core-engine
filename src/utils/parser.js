const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

class Parser {
  constructor() {
    this.xml2js = new xml2js.Builder();
  }

  parseFile(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const xmlString = fs.readFileSync(filePath, 'utf8');
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
      parser.parseString(xmlString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  parseString(xmlString) {
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
      parser.parseString(xmlString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  buildXml(data) {
    return this.xml2js.buildObject(data);
  }
}

module.exports = Parser;