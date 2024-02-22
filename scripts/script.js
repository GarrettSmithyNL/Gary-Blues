let TAX_RATE = 0.15;

let plusElements = document.querySelectorAll(".plus");
let minusElements = document.querySelectorAll(".minus");
let summary = document.querySelector("#summary");

let formatter = new Intl.NumberFormat("es-US", {
  minimumFractionDigits: 2,
  useGrouping: false,
});

plusElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    //Split the element id into smaller peices
    const split = element.id.split("-");

    //Gets the quantity box
    const quantity = document.querySelector(
      `#quantity-${split[1]}-${split[2]}`
    );

    //Gets the name of the menu item
    const name = document.querySelector(
      `#menu-${split[1]}-${split[2]}`
    ).innerText;

    //Gets the price of the item
    const dirtyPrice = document.querySelector(
      `#cost-${split[1]}-${split[2]}`
    ).innerText;
    const arrPrice = dirtyPrice.split(" ");
    const price = arrPrice[1];

    //removes whitespace from id name
    const split2 = name.split(" ");
    let newID = "";
    split2.forEach((element) => {
      newID = newID + element;
    });

    //update the ordered quantity
    quantity.innerHTML = parseInt(quantity.innerHTML) + 1;

    //update Summary Screen
    if (quantity.innerHTML == 1) {
      //create a new div for the entry in the summary
      const node = document.createElement("div");
      //sets the id of the element to name
      node.setAttribute("id", newID);
      node.setAttribute("class", "summaryItem");
      // node.setAttribute("class", "summaryItem");
      //Create the text for the summart
      const text = document.createTextNode(
        `${name} ${parseInt(quantity.innerHTML)} @ $${price}`
      );

      //Adds the text to the new div and add the new div to the summary
      node.appendChild(text);
      summary.appendChild(node);
      updateTotals(price, "plus");
    } else if (quantity.innerHTML > 1) {
      var summaryItem = document.querySelector(`#${newID}`);
      summaryItem.innerText = `${name} ${parseInt(
        quantity.innerHTML
      )} @ $${price}`;
      updateTotals(price, "plus");
    }
  });
});

minusElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    //Split the element id into smaller peices
    let split = element.id.split("-");

    //Gets the quantity box
    let quantity = document.querySelector(`#quantity-${split[1]}-${split[2]}`);

    //Gets the name of the menu item
    const name = document.querySelector(
      `#menu-${split[1]}-${split[2]}`
    ).innerText;

    //Gets the price of the item
    const dirtyPrice = document.querySelector(
      `#cost-${split[1]}-${split[2]}`
    ).innerText;
    const arrPrice = dirtyPrice.split(" ");
    const price = arrPrice[1];

    //removes whitespace from id name
    const split2 = name.split(" ");
    let newID = "";
    split2.forEach((element) => {
      newID = newID + element;
    });

    if (parseInt(quantity.innerHTML) >= 1) {
      //update the ordered quantity
      quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
      //updates the summary
      let summaryItem = document.querySelector(`#${newID}`);
      summaryItem.innerText = `${name}   ${parseInt(
        quantity.innerHTML
      )} @ $${price}`;
      updateTotals(price, "minus");
    }
    //removes the item from the summary if 0 is selected
    if (parseInt(quantity.innerHTML) < 1) {
      document.querySelector(`#${newID}`).remove();
    }
  });
});

let updateTotals = (price, mode) => {
  let subTotalSection = document.querySelector("#sub-total");
  let subTotalText = subTotalSection.innerText;
  const subArr = subTotalText.split(" ");
  let subTotal = parseFloat(subArr[2]);

  let taxesSection = document.querySelector("#taxes");

  let grandTotalSection = document.querySelector("#grand-total");

  console.log(subTotal);
  if (mode === "plus") {
    subTotal = parseFloat(subTotal) + parseFloat(price);
  } else if (mode === "minus") {
    subTotal = parseFloat(subTotal) - parseFloat(price);
  }

  let taxes = parseFloat(subTotal) * TAX_RATE;
  console.log(taxes);
  let grandTotal = parseFloat(taxes) + parseFloat(subTotal);
  console.log(grandTotal);

  let subTemp = Math.round(subTotal * 100) / 100;
  let taxTemp = Math.round(taxes * 100) / 100;
  let grandTemp = Math.round(grandTotal * 100) / 100;

  subTotalSection.innerText = `Sub-Total: $ ${formatter.format(subTemp)}`;
  taxesSection.innerText = `Taxes: $ ${formatter.format(taxTemp)}`;
  grandTotalSection.innerText = `Total: $ ${formatter.format(grandTemp)}`;
};
