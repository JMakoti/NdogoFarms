(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Inio
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });
})(jQuery);

// How to use multi-step cards
document.addEventListener("DOMContentLoaded", function () {
  // Grow Bags functionality
  const growBagsStartBtn = document.getElementById("grow-bags-start");
  const growBagsInitial = document.getElementById("grow-bag-initial");
  const growBagsMultiStep = document.getElementById("grow-bag");
  const growBagsPrevBtn = document.getElementById("grow-bags-prev");
  const growBagsNextBtn = document.getElementById("grow-bags-next");
  const growBagsRestartBtn = document.getElementById("grow-bags-restart");
  // const growBagsCloseBtn = document.getElementById("grow-bags-close");
  const growBagsIndicators = document.getElementById("grow-bag-indicators");
  const growBagsCounter = document.getElementById("grow-bag-counter");

  let growBagsCurrentStep = 2;
  const growBagsTotalSteps = 11;

  // Raised Beds functionality
  const raisedBedsStartBtn = document.getElementById("raised-beds-start");
  const raisedBedsInitial = document.getElementById("raised-beds-initial");
  const raisedBedsMultiStep = document.getElementById("raised-beds");
  const raisedBedsPrevBtn = document.getElementById("raised-beds-prev");
  const raisedBedsNextBtn = document.getElementById("raised-beds-next");
  const raisedBedsRestartBtn = document.getElementById("raised-beds-restart");
  // const raisedBedsCloseBtn = document.getElementById("raised-beds-close");
  const raisedBedsIndicators = document.getElementById(
    "raised-beds-indicators"
  );
  const raisedBedsCounter = document.getElementById("raised-beds-counter");

  let raisedBedsCurrentStep = 2;
  const raisedBedsTotalSteps = 10;

  // Initialize step indicators
  function initializeIndicators() {
    // Grow bags indicators (steps 2-11)
    growBagsIndicators.innerHTML = "";
    for (let i = 2; i <= growBagsTotalSteps; i++) {
      const dot = document.createElement("div");
      dot.className = "step-dot";
      dot.dataset.step = i;
      growBagsIndicators.appendChild(dot);
    }

    // Raised beds indicators (steps 2-10)
    raisedBedsIndicators.innerHTML = "";
    for (let i = 2; i <= raisedBedsTotalSteps; i++) {
      const dot = document.createElement("div");
      dot.className = "step-dot";
      dot.dataset.step = i;
      raisedBedsIndicators.appendChild(dot);
    }

    updateIndicators("grow-bags");
    updateIndicators("raised-beds");
  }

  // Update step indicators
  function updateIndicators(cardType) {
    let currentStep, totalSteps, indicators;

    if (cardType === "grow-bags") {
      currentStep = growBagsCurrentStep;
      totalSteps = growBagsTotalSteps;
      indicators = growBagsIndicators.querySelectorAll(".step-dot");
    } else {
      currentStep = raisedBedsCurrentStep;
      totalSteps = raisedBedsTotalSteps;
      indicators = raisedBedsIndicators.querySelectorAll(".step-dot");
    }

    indicators.forEach((dot, index) => {
      const stepNum = parseInt(dot.dataset.step);
      dot.classList.remove("active", "completed");
      if (stepNum === currentStep) {
        dot.classList.add("active");
      } else if (stepNum < currentStep) {
        dot.classList.add("completed");
      }
    });

    // Update counter text
    if (cardType === "grow-bags") {
      growBagsCounter.textContent = `Step ${currentStep} of ${totalSteps}`;
    } else {
      raisedBedsCounter.textContent = `Step ${currentStep} of ${totalSteps}`;
    }
  }

  // Show a specific step
  function showStep(cardType, stepNumber) {
    // Hide all steps for this card
    const stepPages = document.querySelectorAll(`#${cardType} .step-page`);
    stepPages.forEach((page) => {
      page.classList.remove("active");
    });

    // Show the requested step
    const stepToShow = document.getElementById(
      `${
        cardType === "grow-bag" ? "grow-bags" : "raised-beds"
      }-step-${stepNumber}`
    );
    if (stepToShow) {
      stepToShow.classList.add("active");
    }

    // Update current step variable
    if (cardType === "grow-bag") {
      growBagsCurrentStep = stepNumber;
    } else {
      raisedBedsCurrentStep = stepNumber;
    }

    updateIndicators(cardType === "grow-bag" ? "grow-bags" : "raised-beds");
    updateNavigationButtons(cardType);
  }

  // Update navigation button states
  function updateNavigationButtons(cardType) {
    let currentStep, totalSteps, prevBtn, nextBtn;

    if (cardType === "grow-bag") {
      currentStep = growBagsCurrentStep;
      totalSteps = growBagsTotalSteps;
      prevBtn = growBagsPrevBtn;
      nextBtn = growBagsNextBtn;
    } else {
      currentStep = raisedBedsCurrentStep;
      totalSteps = raisedBedsTotalSteps;
      prevBtn = raisedBedsPrevBtn;
      nextBtn = raisedBedsNextBtn;
    }

    // Update previous button
    prevBtn.disabled = currentStep === 2;

    // Update next button - change text to "Finish" on last step
    if (currentStep === totalSteps) {
      nextBtn.innerHTML = '<span>Finish</span><i class="fas fa-check"></i>';
      nextBtn.classList.add("finish-btn");
    } else {
      nextBtn.innerHTML =
        '<span>Next</span><i class="fas fa-chevron-right"></i>';
      nextBtn.classList.remove("finish-btn");
    }
  }

  // Start the multi-step guide
  function startGuide(cardType) {
    if (cardType === "grow-bags") {
      growBagsInitial.style.display = "none";
      growBagsMultiStep.classList.add("active");
      growBagsStartBtn.style.display = "none";
      showStep("grow-bag", 2);

      // Close raised beds if open
      if (raisedBedsMultiStep.classList.contains("active")) {
        closeGuide("raised-beds");
      }
    } else {
      raisedBedsInitial.style.display = "none";
      raisedBedsMultiStep.classList.add("active");
      raisedBedsStartBtn.style.display = "none";
      showStep("raised-beds", 2);

      // Close grow bags if open
      if (growBagsMultiStep.classList.contains("active")) {
        closeGuide("grow-bags");
      }
    }
  }

  // Close the guide and return to initial state
  function closeGuide(cardType) {
    if (cardType === "grow-bags") {
      growBagsMultiStep.classList.remove("active");
      growBagsInitial.style.display = "block";
      growBagsStartBtn.style.display = "block";
      growBagsCurrentStep = 2;
      updateIndicators("grow-bags");
      updateNavigationButtons("grow-bag");

      // Reset to first step of multi-step guide
      const stepPages = document.querySelectorAll("#grow-bag .step-page");
      stepPages.forEach((page) => {
        page.classList.remove("active");
      });
      document.getElementById("grow-bags-step-2").classList.add("active");
    } else {
      raisedBedsMultiStep.classList.remove("active");
      raisedBedsInitial.style.display = "block";
      raisedBedsStartBtn.style.display = "block";
      raisedBedsCurrentStep = 2;
      updateIndicators("raised-beds");
      updateNavigationButtons("raised-beds");

      // Reset to first step of multi-step guide
      const stepPages = document.querySelectorAll("#raised-beds .step-page");
      stepPages.forEach((page) => {
        page.classList.remove("active");
      });
      document.getElementById("raised-beds-step-2").classList.add("active");
    }
  }

  // Restart the guide (go back to step 2)
  function restartGuide(cardType) {
    if (cardType === "grow-bags") {
      showStep("grow-bag", 2);
    } else {
      showStep("raised-beds", 2);
    }
  }

  // Event listeners for Grow Bags
  growBagsStartBtn.addEventListener("click", () => startGuide("grow-bags"));

  growBagsPrevBtn.addEventListener("click", () => {
    if (growBagsCurrentStep > 2) {
      showStep("grow-bag", growBagsCurrentStep - 1);
    }
  });

  growBagsNextBtn.addEventListener("click", () => {
    if (growBagsCurrentStep < growBagsTotalSteps) {
      showStep("grow-bag", growBagsCurrentStep + 1);
    } else {
      // On last step, "Finish" button closes the guide
      closeGuide("grow-bags");
    }
  });

  growBagsRestartBtn.addEventListener("click", () => restartGuide("grow-bags"));

  // Event listeners for Raised Beds
  raisedBedsStartBtn.addEventListener("click", () => startGuide("raised-beds"));

  raisedBedsPrevBtn.addEventListener("click", () => {
    if (raisedBedsCurrentStep > 2) {
      showStep("raised-beds", raisedBedsCurrentStep - 1);
    }
  });

  raisedBedsNextBtn.addEventListener("click", () => {
    if (raisedBedsCurrentStep < raisedBedsTotalSteps) {
      showStep("raised-beds", raisedBedsCurrentStep + 1);
    } else {
      // On last step, "Finish" button closes the guide
      closeGuide("raised-beds");
    }
  });

  raisedBedsRestartBtn.addEventListener("click", () =>
    restartGuide("raised-beds")
  );

  // Initialize everything
  initializeIndicators();
  updateNavigationButtons("grow-bag");
  updateNavigationButtons("raised-beds");
});
