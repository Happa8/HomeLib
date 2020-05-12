export const fixArray = (
  elm: any | any[],
  toArray: boolean = false,
  arrayNum: 0 | -1 = 0
) => {
  if (Array.isArray(elm)) {
    if (elm.length > 0) {
      if (toArray) {
        return elm;
      } else {
        return elm.slice(arrayNum)[0];
      }
    } else {
      if (toArray) {
        return elm;
      } else {
        return undefined;
      }
    }
  } else {
    if (toArray) {
      return [elm];
    } else {
      return elm;
    }
  }
};

export function editDistanceOND(str1: string, str2: string) {
  var len1 = str1.length,
    len2 = str2.length,
    max = len1 + len2,
    offset = max + 1,
    x,
    y,
    D,
    k,
    kk,
    V = new Array(offset * 2 + 1);

  V[1 + offset] = 0;
  for (D = 0; D <= max; D++) {
    for (k = -D; k <= D; k += 2) {
      kk = k + offset;
      x =
        k == -D || (k != D && V[kk - 1] < V[kk + 1])
          ? V[kk + 1]
          : V[kk - 1] + 1;
      y = x - k;
      //while (x < len1 && y < len2 && str1[x] == str2[y]) {
      while (x < len1 && y < len2 && str1.charCodeAt(x) == str2.charCodeAt(y)) {
        x++;
        y++;
      }
      V[kk] = x;
      if (x >= len1 && y >= len2) {
        return D;
      }
    }
  }
  return -1;
}

export function editOND(str1: string, str2: string) {
  var m = Math.max(str1.length, str2.length);
  var d = editDistanceOND(str1, str2);
  return 1 - d / m;
}

export const toHalfWidth = (str: string) => {
  return str.replace(/[！-～]/g, (str) =>
    String.fromCharCode(str.charCodeAt(0) - 0xfee0)
  );
};
