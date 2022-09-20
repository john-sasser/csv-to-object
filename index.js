const form = document.querySelector("#csvForm");
const csvFileInput = document.querySelector("#csvInput");
const textArea = document.querySelector("#csvResult");

// testing csv -- very small data set to test with;
const csvString = `
Series_reference,Period,Data_value,Suppressed,STATUS,UNITS,Magnitude,Subject,Group,Series_title_1,Series_title_2,Series_title_3,Series_title_4,Series_title_5
BDCQ.SEA1AA,2011.06,80078,,F,Number,0,Business Data Collection - BDC,Industry by employment variable,Filled jobs,"Agriculture, Forestry and Fishing",Actual,,
BDCQ.SEA1AA,2011.09,78324,,F,Number,0,Business Data Collection - BDC,Industry by employment variable,Filled jobs,"Agriculture, Forestry and Fishing",Actual,,
BDCQ.SEA1AA,2011.12,85850,,F,Number,0,Business Data Collection - BDC,Industry by employment variable,Filled jobs,"Agriculture, Forestry and Fishing",Actual,,
`;

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
