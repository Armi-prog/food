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

    // tabs end

    // timer start
    const deadline = "2024-09-25";

    const setZero = n => n >= 0 && n < 10 ? `0${n}` : n;
    
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const total = Date.parse(endtime) - Date.parse(new Date());

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
          days = Math.floor(total / (1000 * 60 * 60 * 24));
          hours = Math.floor((total / (1000 * 60 * 60) % 24));
          minutes = Math.floor((total / 1000 / 60) % 60);
          seconds = Math.floor((total / 1000 ) % 60);   
        }

        return {total, days, hours, minutes, seconds };
    }

    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector);
        const daysElem = timer.querySelector("#days");
        const hoursElem = timer.querySelector("#hours");
        const minutesElem = timer.querySelector("#minutes");
        const secondsElem = timer.querySelector("#seconds");

        const timerID = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);  

    
         daysElem.innerHTML = setZero(days);
         hoursElem.innerHTML = setZero(hours);
         minutesElem.innerHTML = setZero(minutes);
         secondsElem.innerHTML = setZero(seconds);

         if (total.total <= 0)  {
            clearInterval(timerID);
         }
        }
    }

    setTimer(".timer", deadline);
    
//modal start

const modalOpenTriggers = document.querySelectorAll("[data-modal-open]");
const modalCloseTrigger = document.querySelector("[data-modal-close]");
const modal = document.querySelector(".modal");

function hideModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflowY = "auto";
};

function showModal() {
    modal.classList.remove("hide");
    modal.classList.add("show");
    document.body.style.overflowY = "hidden";
    clearTimeout(modalTimerID);
};

modalOpenTriggers.forEach(btn => {
    btn.addEventListener("click", showModal);
});

modalCloseTrigger.addEventListener("click", hideModal);

modal.addEventListener("click", (e) => {
    if (e.target && e.target === modal) hideModal();
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.matches(".show")) hideModal();
});

const modalTimerID = setTimeout(showModal, 5000);

function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight <= documentElement.clientHeight) {
        showModal();
        window.removeEventListener("scroll", showModalByScroll);
    }
}

window.addEventListener("scroll", showModalByScroll);

//modal end
});