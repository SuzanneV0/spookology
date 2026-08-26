// "What is your Halloween spirit trope?" quiz logic.
(function () {
  "use strict";

  var results = {
    ghost: {
      title: "Ghost 👻",
      text: "Mysterious, a little mischievous, and impossible to pin down. You'd rather haunt the party from the shadows than be the center of it.",
    },
    vampire: {
      title: "Vampire 🧛",
      text: "Elegant, timeless, and always the most dramatic one in the room. You've seen it all before, and you're still the most stylish one there.",
    },
    witch: {
      title: "Witch 🧙",
      text: "Clever, a little chaotic, and always brewing up something new. You've got a plan for everything, and a backup plan too.",
    },
    mummy: {
      title: "Mummy",
      text: "Ancient, patient, and full of secrets wrapped up tight. You take your time, but you're impossible to unravel.",
    },
    zombie: {
      title: "Zombie 🧟",
      text: "Laid-back, unstoppable, and always up for one more slice of candy. Nothing rattles you, and nothing slows you down for long.",
    },
    frankenstein: {
      title: "Frankenstein's Monster",
      text: "A one-of-a-kind creation, built different and proud of it. You're at your best when you're making something entirely your own.",
    },
    "black-cat": {
      title: "Black Cat 🐈‍⬛",
      text: "Sleek, independent, and secretly running the whole show. You go where you want, when you want, and everyone else just has to keep up.",
    },
  };

  var priority = [
    "ghost",
    "vampire",
    "witch",
    "mummy",
    "zombie",
    "frankenstein",
    "black-cat",
  ];

  var form = document.getElementById("quiz-form");
  var resultBox = document.getElementById("quiz-result");
  var resultTitle = document.getElementById("quiz-result-title");
  var resultText = document.getElementById("quiz-result-text");
  var retakeBtn = document.getElementById("quiz-retake");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var tallies = {};
    priority.forEach(function (key) {
      tallies[key] = 0;
    });

    var checked = form.querySelectorAll("input[type='radio']:checked");
    if (checked.length < form.querySelectorAll("fieldset").length) {
      var firstUnanswered = form.querySelector(
        "fieldset:not(:has(input:checked))"
      );
      if (firstUnanswered && firstUnanswered.scrollIntoView) {
        firstUnanswered.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    checked.forEach(function (input) {
      var trope = input.getAttribute("data-trope");
      if (trope && tallies.hasOwnProperty(trope)) {
        tallies[trope] += 1;
      }
    });

    var winner = priority[0];
    var best = -1;
    priority.forEach(function (key) {
      if (tallies[key] > best) {
        best = tallies[key];
        winner = key;
      }
    });

    var result = results[winner];
    if (resultTitle) resultTitle.textContent = "You're a " + result.title;
    if (resultText) resultText.textContent = result.text;

    form.hidden = true;
    if (resultBox) {
      resultBox.hidden = false;
      resultBox.setAttribute("tabindex", "-1");
      resultBox.focus();
    }
  });

  if (retakeBtn) {
    retakeBtn.addEventListener("click", function () {
      form.reset();
      form.hidden = false;
      if (resultBox) resultBox.hidden = true;
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();
