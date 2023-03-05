export default class TretemiusCipher {
  constructor() {}

  static unicodeNumber = 65_535;
  static keyController = 20_000;
  cipher(text, key, isEncryption) {
    let result = "";
    if (Number(key.replaceAll(" ", ""))) {
      let keyArray = key.split(" ");
      keyArray = keyArray.map((num) => Number(num));
      // count key
      result = text
        .split("")
        .map((ch, i) => {
          let key =
            keyArray.reduce(
              (acc, num, index) =>
                (acc += num * i ** (keyArray.length - index - 1)),
              0
            ) % TretemiusCipher.keyController;
          key = isEncryption ? key : -key;
          return (ch = String.fromCodePoint(
            Math.abs(ch.codePointAt(0) + key) % TretemiusCipher.unicodeNumber
          ));
        })
        .join("");
      console.log("");
    } else {
      let keyArray = key.split("");
      let keyCode = "";
      result = text
        .split("")
        .map((ch, i) => {
          let keyI = i % keyArray.length;
          keyCode = keyArray[keyI].charCodeAt(0);
          if (!isEncryption) keyCode = -keyCode;
          return (ch = String.fromCharCode(
            parseInt(
              (ch.charCodeAt(0) + keyCode) % TretemiusCipher.unicodeNumber
            )
          ));
        })
        .join("");
    }
    return result;
  }

  encrypt(text, key, isEncryption = true) {
    return this.cipher(text, key, isEncryption);
  }

  decrypt(text, key, isEncryption = false) {
    return this.cipher(text, key, isEncryption);
  }
}
