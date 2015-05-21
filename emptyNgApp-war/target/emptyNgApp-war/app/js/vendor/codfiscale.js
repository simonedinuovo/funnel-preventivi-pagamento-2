var CodFiscale = {};
CodFiscale.encode_month = ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"];
CodFiscale.encode_omocodia = ["L", "M", "N", "P", "Q", "R", "S", "T", "U", "V"];
CodFiscale.checksum_table_odd = {
    0: 1,
    1: 0,
    2: 5,
    3: 7,
    4: 9,
    5: 13,
    6: 15,
    7: 17,
    8: 19,
    9: 21,
    A: 1,
    B: 0,
    C: 5,
    D: 7,
    E: 9,
    F: 13,
    G: 15,
    H: 17,
    I: 19,
    J: 21,
    K: 2,
    L: 4,
    M: 18,
    N: 20,
    O: 11,
    P: 3,
    Q: 6,
    R: 8,
    S: 12,
    T: 14,
    U: 16,
    V: 10,
    W: 22,
    X: 25,
    Y: 24,
    Z: 23
};
CodFiscale.checksum_table_even = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25
};
CodFiscale.checksum_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
CodFiscale.checksum = function(b) {
    var a, d = 0;
    for (a = 0; a < 15; a++) {
        var e = b[a];
        if (a % 2) {
            d += this.checksum_table_even[e];
        } else {
            d += this.checksum_table_odd[e];
        }
    }
    d = d % 26;
    return this.checksum_table.charAt(d);
};
CodFiscale.omocodia = function(b, e) {
    var c = [14, 13, 12, 10, 9, 7, 6];
    var d = [];
    while (e > 0 && c.length) {
        var a = e % c.length;
        e = Math.floor(e / c.length);
        d.push(c.splice(a - 1, 1)[0]);
    }
};
CodFiscale.consonanti = function(a) {
    return a.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, "");
};
CodFiscale.vocali = function(a) {
    return a.replace(/[^AEIOU]/gi, "");
};
CodFiscale.encode_surname = function(b) {
    var a = this.consonanti(b);
    a += this.vocali(b);
    a += "XXX";
    a = a.substr(0, 3);
    return a.toUpperCase();
};
CodFiscale.encode_name = function(a) {
    var b = this.consonanti(a);
    if (b.length >= 4) {
        b = b.charAt(0) + b.charAt(2) + b.charAt(3);
    } else {
        b += this.vocali(a);
        b += "XXX";
        b = b.substr(0, 3);
    }
    return b.toUpperCase();
};
CodFiscale.encode_data = function(e, i, g, a) {
    var h = new Date();
    h.setYear(g);
    h.setMonth(i - 1);
    h.setDate(e);
    var f = "0" + h.getFullYear();
    f = f.substr(f.length - 2, 2);
    if (i.length == 2 && i.substr(0, 1) == "0") {
        i = i.substr(1, 1);
    }
    var c = this.encode_month[i - 1];
    var b = h.getDate();
    if (a.toUpperCase() == "F") {
        b += 40;
    }
    b = "0" + b;
    b = b.substr(b.length - 2, 2);
    return "" + f + c + b;
};
CodFiscale.encode_comune = function(a) {
    if (!a) {
        return;
    }
    if (a.match(/^[A-Z]\d\d\d$/i)) {
        return a;
    }
    return "";
};
CodFiscale.calcola = function(f, h, b, e, d, g, c) {
    var a = this.encode_surname(h) + this.encode_name(f) + this.encode_data(e, d, g, b) + this.encode_comune(c);
    a += this.checksum(a);
    return a;
};