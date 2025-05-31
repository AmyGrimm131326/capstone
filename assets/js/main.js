// popover for online order policy
$(function () {
  $('[data-toggle="popover"]').popover();
})
$(function () {
  $('.popover').popover({
    container: 'body'
  });
});
// end of popover for online order policy
// hide cart
$("#cart").hide();
// javascript requirement #one
// Constructor function to create cart items from the menu.
function Menu(name, price, qty) {
  this.name = name,
    this.price = price,
    this.qty = qty,
    this.total = 0,
    this.calc = () => {
      this.total = (parseInt(this.price) * parseInt(this.qty)).toFixed(2);
    }
  this.calc();
}
let total = 0;
let cartObjects = [];
function cart(e) {
  let item = e.target.name;
  let price = e.target.dataset.value;
  let qty = e.target.value;
  // let total = parseInt(price) * parseInt(qty)
  let inCart = false;
  // looping through every object in our array
  for (let obj in cartObjects) {
    // nested for loop javascript requirement #two
    // for in loop allows us to loop through properites of each object in our cart to check if the new item is allready in there, if so just update the quanity, otherwise push the whole new object in to our cart objects array,

    //  checking if items are in cart #3(if else)
    if (cartObjects[obj].name === item) {
      inCart = true;
      if (qty == 0) {
        cartObjects.splice(obj, 1);
      } else {
        cartObjects[obj].qty = qty;
        cartObjects[obj].calc();
      }

    }

  }
  inCart ? null : cartObjects.push(new Menu(item, price, qty));//.push is a array method requirement #four

  displayCart()
}
// using jquery to hide, show, append, empty cart.
function displayCart() {
  $("#cart").hide();
  if (cartObjects.length > 0) {
    total = 0
    $("#cart").show();
    $("#cartItems").empty();
    cartObjects.forEach(obj => {
      $("#cartItems").append(`
     <tr>
    <td>${obj.qty}</td>
    <td>${obj.name}</td>
    <td>${obj.price}</td>
    <td>${obj.total}</td>
    </tr>
    `),
        total += parseInt(obj.total)
    });
    $("#cartItems").append(`
  <tr>
  <td>Sub-Total: ${total.toFixed(2)}</td>
  <td>Tax: ${(total * .07).toFixed(2)}</td>
  <td>Total:</td>
  <td>${(total * 1.07).toFixed(2)}</td>
  </tr>
 }
}`);

  }
}
// this is my jquery event listener, and my last jquery method to update HTML and i used a chain method.
$("#checkOut").on("click", function () {
  $("#checkOutTotal").text(` $${(total * 1.07).toFixed(2)}`).css('color','green');
})

// #5 im using local storage and a arrow function.
let collectName = (() => {
  let fName = $("#firstNameInput").val();
  let lName = $("#lastNameInput").val();
  let name = `${fName} ${lName}`;

 localStorage.setItem('customer', name);
  confirmOrder();
});

// this is my thank you order that comes up after they click submit.

function confirmOrder() {
  $("#checkOutLabel").text("Thank You for your order");
  let mBody = document.getElementById("mBody");
  mBody.innerHTML = "";
  let customerName = localStorage.getItem('customer');
  mBody.innerHTML = `<h3 class='text-center text-danger' >
  ${customerName}</h3> <h6 class='text-center'> Your order will be ready for pick-up in 20 minutes</h6>`;
  let xBtn = document.getElementById("xBtn");
  xBtn.addEventListener('click', closeProgram);
}
// this is to clear out our local storage and refresh the screen.
function closeProgram() {
 localStorage.clear();
  window.location.reload(true);
}






