const form = document.querySelector("#csvForm");
const csvFileInput = document.querySelector("#csvInput");
const textArea = document.querySelector("#csvResult");

// testing csv -- very small data set to test with;
import csvString from "./test-data/testdata.csv";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  //logic for when the form is submitted

  const file = csvFileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const csvArray = csvToArray(e.target.result, ",");
    console.log(csvArray.length);
    textArea.value = JSON.stringify(csvArray, null, 4);
  };

  reader.readAsText(file);
});

function csvToArray(stringVal, splitter) {
  const [keys, ...rest] = stringVal
    .trim()
    .split("\n")
    .map((item) => item.split(splitter));
  //  console.log(`stringVal: ${stringVal}`);

  const formedArr = rest.map((item) => {
    const obj = {};
    keys.forEach((key, idx) => (obj[key] = item.at(idx)));
    return obj;
  });
  return formedArr;
}

csvToArray(csvString);
