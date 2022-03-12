const circle = 100000000;

const text = "abcdefghijklmnopqrstuvwxyz";
const chars = [...text];
const testdepth = 4;
"";

function fillTestObj(
  depht: number,
  s: string,
  testObj: { [key: string]: string },
) {
  testObj[s] = s;
  if (depht == 0) {
    return;
  }
  chars.forEach(function (char) {
    fillTestObj(depht - 1, s + char, testObj);
  });
}
const testObj: { [key: string]: string } = {};
fillTestObj(testdepth, "", testObj);
console.log("testObj created");
const aset = new Set(Object.keys(testObj));
const amap = new Map(Object.entries(testObj));
const aarray = Object.keys(testObj);
const testv = "zzzz";
Deno.test({
  name: "Test Speed Set",
  fn: () => {
    for (let i = 0; i < circle; i++) {
      aset.has(testv);
    }
  },
});
Deno.test({
  name: "Test Speed MAP",
  fn: () => {
    for (let i = 0; i < circle; i++) {
      amap.has(testv);
    }
  },
});

Deno.test({
  name: "Test Speed Array",
  fn: () => {
    for (let i = 0; i < circle; i++) {
      aarray.includes(testv);
    }
  },
});
