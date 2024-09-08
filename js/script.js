"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const tabsHeaders = document.querySelectorAll(".tabheader__item");
    const tabsHeadersParent = document.querySelector(".tabheader__items");
    const tabsContents = document.querySelectorAll(".tabcontent");

    function hideTabContent() {
        tabsContents.forEach(item =>{
         item.classList.add("hide");
         item.classList.remove("show", "fade");
        });

        tabsHeaders.forEach(item =>{
            item.classList.remove("tabheader__item_active");
           });
    }

    function showTabContent(i = 0) {
        tabsContents[i].classList.add("show", "fade");
        tabsContents[i].classList.remove("hide");
        tabsHeaders[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsHeadersParent.addEventListener("click", (e) => {
        if (e.target && e.target.matches(".tabheader__item")) {
            tabsHeaders.forEach((item, index) => {
              if (e.target === item) {
                hideTabContent();
                showTabContent(index);
              }
            })
        }
    })
});