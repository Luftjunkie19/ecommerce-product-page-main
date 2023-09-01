let productQuantity = 0;
let index = 0;
const shoppingCart = [];
const increaseBtn = document.querySelector(".increase-btn");
const decreaseBtn = document.querySelector(".decrease-btn");
const menuBtn = document.querySelector(".menu-btn");
const purchaseBtn = document.querySelector(".add-btn");
const quantityHodler = document.querySelector(".quantity");
const productName = document.querySelector(".title");
const mobileMenuBg = document.querySelector(".menu-bg");
const mobileMenu = document.querySelector(".menu");
const smallImages = document.querySelectorAll(".small-image");
const previewImg = document.querySelector(".preview");
const itemsDot = document.querySelector(".items-dot");
const rightArrowBtn = document.querySelector(".right");
const leftArrowBtn = document.querySelector(".left");
const swiper = document.querySelector(".swiper");
const imagesSrc = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];

const moveBack = () => {
  if (index <= 0) {
    index = imagesSrc.length - 1;
    swiper.children[1].src = imagesSrc[index];
  } else {
    index = index - 1;
    swiper.children[1].src = imagesSrc[index];
  }
};

const moveForward = () => {
  if (index >= imagesSrc.length - 1) {
    index = 0;
    swiper.children[1].src = imagesSrc[index];
  } else {
    index = index + 1;
    swiper.children[1].src = imagesSrc[index];
  }
};

rightArrowBtn.addEventListener("click", moveForward);
leftArrowBtn.addEventListener("click", moveBack);

smallImages.forEach((image) => {
  image.addEventListener("click", () => {
    smallImages.forEach((img) => {
      img.classList.remove("active");
    });

    image.classList.add("active");

    if (image.classList.contains("active")) {
      const bigImg = image.getAttribute("data-bigImgSrc");

      previewImg.children[0].src = bigImg;
    }
  });
});

const increaseQuantity = () => {
  productQuantity = productQuantity + 1;
  quantityHodler.value = productQuantity;
};

const openMenu = () => {
  mobileMenu.classList.add("active");
  mobileMenuBg.classList.add("active");
};

const showSlider = () => {};

const closeMenu = (e) => {
  if (
    mobileMenu.classList.contains("active") &&
    mobileMenuBg.classList.contains("active")
  ) {
    mobileMenu.classList.remove("active");
    mobileMenuBg.classList.remove("active");
  }
};

const decreaseQuantity = () => {
  if (productQuantity === 0) {
    productQuantity = 0;
  } else {
    productQuantity = productQuantity - 1;
    quantityHodler.value = productQuantity;
  }
};

const addItemToTheCart = () => {
  let stored = JSON.parse(localStorage.getItem("shoppingCart"));

  const shoppingItem = {
    name: productName.value,
    price: 125,
    productQuantity: +quantityHodler.value,
    totalPrice: 125 * +quantityHodler.value,
    id: 123,
  };

  if (+quantityHodler.value === 0) {
    alert("You cannot add 0 elements to the cart.");
  }

  if (stored === null) {
    stored = [];
    shoppingCart.push(shoppingItem);
    itemsDot.classList.add("active");
    itemsDot.textContent = shoppingItem.productQuantity;
    stored = localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  } else {
    if (stored.find((item) => item.id === 123)) {
      const shoppingItem = stored.find((item) => item.id === 123);
      const shoppingItemIndex = stored.findIndex((item) => item.id === 123);
      shoppingItem.productQuantity =
        shoppingItem.productQuantity + parseFloat(quantityHodler.value);

      shoppingItem.totalPrice =
        shoppingItem.productQuantity * shoppingItem.price;

      stored = stored.splice(shoppingItemIndex, 1, shoppingItem);

      itemsDot.classList.add("active");
      itemsDot.textContent = stored[0].productQuantity;

      localStorage.setItem("shoppingCart", JSON.stringify(stored));
    }
  }
};

const loadStorage = () => {
  const storage = JSON.parse(localStorage.getItem("shoppingCart"));
  console.log(storage);

  if (storage.length > 0) {
    itemsDot.classList.add("active");
    itemsDot.textContent = storage[0].productQuantity;
  }
};

document.addEventListener("DOMContentLoaded", loadStorage);
purchaseBtn.addEventListener("click", addItemToTheCart);
increaseBtn.addEventListener("click", increaseQuantity);
decreaseBtn.addEventListener("click", decreaseQuantity);
menuBtn.addEventListener("click", openMenu);
mobileMenuBg.addEventListener("click", closeMenu);
