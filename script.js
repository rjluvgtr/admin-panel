var url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

let tbl = document.getElementById("table-body");
let infoDetail = document.getElementById("info-content");

let tblList = new XMLHttpRequest();
tblList.open("GET", url, true);
tblList.send();

tblList.onreadystatechange = function () {
  if (tblList.readyState == 4) {
    const res = JSON.parse(tblList.responseText);
    //console.log(res);
    for (i = 0; i < res.length; i++) {
      id = res[i]["id"];
      first = res[i]["firstName"];
      last = res[i]["lastName"];
      mail = res[i]["email"];
      phone = res[i]["phone"];
      address = res[i]["address"];
      description = res[i]["description"];
      showTable(id, first, last, mail, phone, address, description);
    }
  }
};

function showTable(id, first, last, mail, phone, address, description) {
  const row = document.createElement("tr");
  row.classList.add("data-row");
  row.id = id;
  row.addEventListener("click", function () {
    let el = document.getElementsByClassName("data-row");
    for (let i = 0; i < el.length; i++) {
      el[i].style.backgroundColor = "white";
    }
    document.getElementById(id).style.backgroundColor = "lightseagreen";
    let innerName =
      "<div><b>User selected:</b>" + first + " " + last + "</div>";
    let innerDescription =
      "<div><b> Description: </b><textarea cols='50' rows='5' readonly>" +
      description +
      "</textarea></div >";
    let street = "<div><b>Address:</b>" + address["streetAddress"] + "</div>";
    let city = "<div><b>City:</b>" + address["city"] + "</div>";
    let state = "<div><b>State:</b>" + address["state"] + "</div>";
    let zip = "<div><b>Zip:</b>" + address["zip"] + "</div>";
    let innerTotal = innerName + innerDescription + street + city + state + zip;
    //console.log(innerTotal);
    infoDetail.innerHTML = innerTotal;
    infoDetail.style.display = "block";
  });
  colOne = document.createElement("td");
  colOne.classList.add("col1");
  colOne.innerText = id;
  colTwo = document.createElement("td");
  colTwo.classList.add("col2");
  colTwo.innerText = first;
  colThree = document.createElement("td");
  colThree.classList.add("col3");
  colThree.innerText = last;
  colFour = document.createElement("td");
  colFour.classList.add("col4");
  colFour.innerText = mail;
  colFive = document.createElement("td");
  colFive.classList.add("col5");
  colFive.innerText = phone;
  row.appendChild(colOne);
  row.appendChild(colTwo);
  row.appendChild(colThree);
  row.appendChild(colFour);
  row.appendChild(colFive);

  tbl.appendChild(row);
}

const searchBox = document.getElementById("search-box");
const searchElement = document.getElementsByClassName("data-row");

searchBox.addEventListener("input", function () {
  content = searchBox.value;
  for (let i = 0; i < searchElement.length; i++) {
    name = searchElement[i].getElementsByClassName("col2")[0].innerText;
    name = name.toLowerCase();
    if (!name.includes(content)) {
      searchElement[i].style.display = "none";
    } else {
      searchElement[i].style.display = "";
    }
  }
});
