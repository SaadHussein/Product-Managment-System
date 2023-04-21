const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let mood = "create";
let inndex;

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;

    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

let dataProducts;

if (localStorage.products != null) {
  dataProducts = JSON.parse(localStorage.getItem("products"));
} else {
  dataProducts = [];
}

submit.addEventListener("click", function () {
  const newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (
    title.value !== "" &&
    price.value !== "" &&
    category.value !== "" &&
    newProduct.count <= 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProducts.push(newProduct);
        }
      } else {
        dataProducts.push(newProduct);
      }
    } else {
      dataProducts[inndex] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }

    clearData();
  }

  localStorage.setItem("products", JSON.stringify(dataProducts));

  showData();
});

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  getTotal();
  let table = "";
  dataProducts.forEach((dataProduct, index) => {
    table += `
      <tr>
        <td>${index + 1}</td>
        <td>${dataProduct.title}</td>
        <td>${dataProduct.price}</td>
        <td>${dataProduct.taxes}</td>
        <td>${dataProduct.ads}</td>
        <td>${dataProduct.discount}</td>
        <td>${dataProduct.total}</td>
        <td>${dataProduct.category}</td>
        <td><button onclick="updateData(${index})" id="update">Update</button></td>
        <td><button onclick="deleteData(${index})" id="delete">Delete</button></td>
      </tr>
    `;
  });

  document.getElementById("tbody").innerHTML = table;

  const deleteAllBtn = document.getElementById("deleteAll");
  if (dataProducts.length > 0) {
    deleteAllBtn.innerHTML = `
      <button onclick="deleteAll()">Delete All (${dataProducts.length})</button>
    `;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}

showData();

function deleteData(productIndex) {
  dataProducts.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(dataProducts));
  showData();
}

function deleteAll() {
  localStorage.removeItem("products");
  dataProducts.splice(0);
  showData();
}

function updateData(productIndex) {
  inndex = productIndex;
  title.value = dataProducts[productIndex].title;
  price.value = dataProducts[productIndex].price;
  taxes.value = dataProducts[productIndex].taxes;
  ads.value = dataProducts[productIndex].ads;
  discount.value = dataProducts[productIndex].discount;
  category.value = dataProducts[productIndex].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  scroll({ top: 0, behavior: "smooth" });
}

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    dataProducts.forEach((dataProduct, index) => {
      console.log(dataProduct.title.toLowerCase().includes(value));
      console.log(value);
      if (dataProduct.title.toLowerCase().includes(value)) {
        table += `
      <tr>
        <td>${index + 1}</td>
        <td>${dataProduct.title}</td>
        <td>${dataProduct.price}</td>
        <td>${dataProduct.taxes}</td>
        <td>${dataProduct.ads}</td>
        <td>${dataProduct.discount}</td>
        <td>${dataProduct.total}</td>
        <td>${dataProduct.category}</td>
        <td><button onclick="updateData(${index})" id="update">Update</button></td>
        <td><button onclick="deleteData(${index})" id="delete">Delete</button></td>
      </tr>
    `;
      }
    });
  } else {
    dataProducts.forEach((dataProduct, index) => {
      if (dataProduct.category.toLowerCase().includes(value)) {
        table += `
      <tr>
        <td>${index + 1}</td>
        <td>${dataProduct.title}</td>
        <td>${dataProduct.price}</td>
        <td>${dataProduct.taxes}</td>
        <td>${dataProduct.ads}</td>
        <td>${dataProduct.discount}</td>
        <td>${dataProduct.total}</td>
        <td>${dataProduct.category}</td>
        <td><button onclick="updateData(${index})" id="update">Update</button></td>
        <td><button onclick="deleteData(${index})" id="delete">Delete</button></td>
      </tr>
    `;
      }
    });
  }

  document.getElementById("tbody").innerHTML = table;
}
