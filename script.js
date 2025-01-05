"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Map to store click counts for each keyword
  const clickCounts = new Map();
  let totalClicks = 0;
  let secretCodeProgress = "";
  const secretCode = "ljubav";
  let lastClickTime = Date.now();

  // Add subtle heartbeat animation to the title
  const title = document.querySelector("h1");
  setInterval(() => {
    title.style.transform = "scale(1.02)";
    setTimeout(() => {
      title.style.transform = "scale(1)";
    }, 200);
  }, 2000);

  // Track mouse movement for parallax effect on main content
  document.addEventListener("mousemove", (e) => {
    const puzzle = document.querySelector(".puzzle");
    const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
    puzzle.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  // Select all elements with class 'keyword'
  const keywords = document.querySelectorAll(".keyword");

  // Add special hover effect
  keywords.forEach((keyword) => {
    keyword.addEventListener("mouseover", () => {
      keyword.style.textShadow = "0 0 10px rgba(219, 39, 119, 0.5)";
    });

    keyword.addEventListener("mouseout", () => {
      keyword.style.textShadow = "none";
    });
  });

  // Easter egg: Konami code implementation
  const konamiCode = ["l", "j", "u", "b", "a", "v"];
  let konamiProgress = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[konamiProgress]) {
      konamiProgress++;
      if (konamiProgress === konamiCode.length) {
        document.body.style.background =
          "linear-gradient(45deg, #ff69b4, #ff1493)";
        setTimeout(() => {
          document.body.style.background = "";
        }, 3000);
        konamiProgress = 0;
      }
    } else {
      konamiProgress = 0;
    }
  });

  // Add click event listener to each keyword element
  keywords.forEach((keyword, index) => {
    clickCounts.set(index, 0);

    keyword.addEventListener("click", (e) => {
      const currentTime = Date.now();
      const timeSinceLastClick = currentTime - lastClickTime;
      lastClickTime = currentTime;

      // Track total clicks
      totalClicks++;

      // Increment count for this specific keyword
      let count = clickCounts.get(index) + 1;
      clickCounts.set(index, count);

      // Add character to secret code progress
      secretCodeProgress += keyword.textContent.toLowerCase().charAt(0);
      if (secretCodeProgress.length > secretCode.length) {
        secretCodeProgress = secretCodeProgress.slice(1);
      }

      // Create hearts effect on click
      createHearts(e.clientX, e.clientY);

      // Different messages based on various conditions
      if (timeSinceLastClick < 500) {
        alert("Полако, лав! Не жури. 🌸");
      } else if (totalClicks === 10) {
        alert(
          "Десет пута си кликнула на речи љубав... Да ли ми то нешто поручујеш? 💫"
        );
      } else if (secretCodeProgress === secretCode) {
        alert("Пронашла си тајну реч! 42 🌟");
        playSpecialAnimation();
      } else if (count === 1) {
        alert("Љубав!!! Чуо сам да желиш да ме видиш, убрзаћу! 42 💕");
      } else if (count === 2) {
        alert("Опет? Мора да ти стварно недостајем! 💝");
      } else {
        alert("Стрпљење! Ускоро стижем! 🚀");
        clickCounts.set(index, 0);
      }
    });
  });

  // Function to create floating hearts effect
  function createHearts(x, y) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = "24px";
    heart.style.pointerEvents = "none";
    heart.style.transition = "all 1s ease-out";
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translate(${
        Math.random() * 100 - 50
      }px, -100px)`;
      heart.style.opacity = "0";
    }, 50);

    setTimeout(() => {
      document.body.removeChild(heart);
    }, 1000);
  }

  // Special animation function
  function playSpecialAnimation() {
    const puzzle = document.querySelector(".puzzle");
    puzzle.style.transition = "all 1s ease";
    puzzle.style.transform = "scale(1.05)";
    setTimeout(() => {
      puzzle.style.transform = "scale(1)";
    }, 1000);
  }

  // Easter egg: Double tap anywhere shows hidden message
  let lastTap = 0;
  document.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
      const hiddenMessage = document.querySelector(".hidden-message");
      hiddenMessage.style.opacity = "0.4";
      setTimeout(() => {
        hiddenMessage.style.opacity = "0.05";
      }, 100);
    }
    lastTap = currentTime;
  });
});
