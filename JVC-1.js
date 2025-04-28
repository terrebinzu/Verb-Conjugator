     // JavaScript Document
window.generate = function () {
  var verbInput = document.getElementById("verbInput").value.trim();
  var output = document.getElementById("output");

  // Step 1: Normalize
  var normalizedKana = wanakana.toKana(verbInput);
  var stripped = wanakana.stripOkurigana(verbInput);
  var baseKana = wanakana.toKana(stripped);

  // Step 2: Get checkboxes
  var showPolite = document.getElementById("formPolite").checked;
  var showNegative = document.getElementById("formNegative").checked;
  var showPast = document.getElementById("formPast").checked;
  var showTe = document.getElementById("formTe").checked;
var showFurigana = document.getElementById("showFurigana").checked; // NEW

    var inputDisplay = showFurigana ? addFurigana(verbInput, normalizedKana) : verbInput;


             // Step 3: Handle irregular verbs first
      if (normalizedKana === "する") {
  var html = '<p><strong>Input:</strong> ' + inputDisplay + '</p>';
    html += '<p><strong>Polite:</strong>します</p>';
    html += '<p><strong>[Irregular] Plain:</strong> する</p>';
    if (showPolite) html += '<p><strong>Polite:</strong> します</p>';
    if (showNegative) html += '<p><strong>Negative:</strong> しない</p>';
    if (showPast) html += '<p><strong>Past:</strong> した</p>';
    if (showTe) html += '<p><strong>Te-form:</strong> して</p>';
    output.innerHTML = html;
          // Get input, normalize, conjugate, output to screen
   saveToHistory(verbInput);
displayHistory(); 
    return;
  }

  // Step 4: Irregular - くる
  if (normalizedKana === "くる") {
   var html = '<p><strong>Input:</strong> ' + inputDisplay + '</p>';
    html += '<p><strong>Polite:</strong> きます</p>';
    html += '<p><strong>[Irregular] Plain:</strong> くる</p>';
    if (showPolite) html += '<p><strong>Polite:</strong> きます</p>';
    if (showNegative) html += '<p><strong>Negative:</strong> こない</p>';
    if (showPast) html += '<p><strong>Past:</strong> きた</p>';
    if (showTe) html += '<p><strong>Te-form:</strong> きて</p>';
    output.innerHTML = html;
      // Get input, normalize, conjugate, output to screen
   saveToHistory(verbInput);
displayHistory(); 
    return;
  }

        // Step 5: Ichidan (る-verbs with i/e vowel)
  if (normalizedKana.endsWith("る")) {
    var preRu = baseKana.slice(-1);
    if (preRu === "い" || preRu === "え") {
      var stem = baseKana;
     var html = '<p><strong>Input:</strong> ' + inputDisplay + '</p>';
        html += '<p><strong>Polite:</strong> ' + stem + 'ます</p>';
        html += '<p><strong>[Ichidan] Plain:</strong> ' + normalizedKana + '</p>';
      if (showPolite) html += '<p><strong>Polite:</strong> ' + stem + 'ます</p>';
      if (showNegative) html += '<p><strong>Negative:</strong> ' + stem + 'ない</p>';
      if (showPast) html += '<p><strong>Past:</strong> ' + stem + 'た</p>';
      if (showTe) html += '<p><strong>Te-form:</strong> ' + stem + 'て</p>';
      output.innerHTML = html;
        // Get input, normalize, conjugate, output to screen
   saveToHistory(verbInput);
displayHistory(); 
      return;
    }
  }

        // Step 5: Godan U-verb

          var uVerbStemMap = {
            "う": "い",
            "く": "き",
            "ぐ": "ぎ",
            "す": "し",
            "つ": "ち",
            "ぬ": "に",
            "ぶ": "び",
            "む": "み",
            "る": "り"
          };

          var negMap = {
            "う": "わ",
            "つ": "た",
            "る": "ら",
            "む": "ま",
            "ぶ": "ば",
            "ぬ": "な",
            "く": "か",
            "ぐ": "が",
            "す": "さ"
          };

          var pastMap = {
            "う": "った",
            "つ": "った",
            "る": "った",
            "む": "んだ",
            "ぶ": "んだ",
            "ぬ": "んだ",
            "く": "いた",
            "ぐ": "いだ",
            "す": "した"
          };

          var teMap = {
            "う": "って",
            "つ": "って",
            "る": "って",
            "む": "んで",
            "ぶ": "んで",
            "ぬ": "んで",
            "く": "いて",
            "ぐ": "いで",
            "す": "して"
          };

     var ending = normalizedKana.slice(-1);
    
  if (uVerbStemMap[ending]) { 
      
      var stem = normalizedKana.slice(0, -1) + uVerbStemMap[ending];
     var html = '<p><strong>Input:</strong> ' + inputDisplay + '</p>';
  html += '<p><strong>[Godan] Plain:</strong> ' + normalizedKana + '</p>';
      html += '<p><strong>Polite:</strong> ' + stem + 'ます</p>';

    if (showPolite) html += '<p><strong>Polite:</strong> ' + stem + 'ます</p>';
    if (showNegative) html += '<p><strong>Negative:</strong> ' + normalizedKana.slice(0, -1) + negMap[ending] + 'ない</p>';
    if (showPast) html += '<p><strong>Past:</strong> ' + normalizedKana.slice(0, -1) + pastMap[ending] + '</p>';
    if (showTe) html += '<p><strong>Te-form:</strong> ' + normalizedKana.slice(0, -1) + teMap[ending] + '</p>';
    output.innerHTML = html;
      // Get input, normalize, conjugate, output to screen
   saveToHistory(verbInput);
displayHistory(); 
    return;
  }
    
  // Fallback if nothing matches
  output.innerHTML = '<p>I do not know how to conjugate "' + verbInput + '" yet.</p>';
};

function addFurigana(kanjiInput, kanaReading) {
  if (kanjiInput === kanaReading) return kanjiInput; // Already kana, no need for furigana

  for (let i = 0; i < kanjiInput.length; i++) {
    const char = kanjiInput[i];
    if (wanakana.isKanji(char)) {
      return kanjiInput.replace(char, `<ruby>${char}<rt>${kanaReading[i]}</rt></ruby>`);
    }
  }

  return kanjiInput;
}


function saveToHistory(verb) {
  let history = JSON.parse(localStorage.getItem("conjugationHistory")) || [];
  history.unshift(verb); // Add new verb to beginning
  history = history.slice(0, 5); // Keep only latest 5
  localStorage.setItem("conjugationHistory", JSON.stringify(history));
}

function displayHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("conjugationHistory")) || [];
    history.forEach(verb => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = verb;
    li.onclick = () => {
      document.getElementById("verbInput").value = verb;
      generate(); // Re-generate when clicked
    };
    historyList.appendChild(li);
  });
}
document.getElementById("verbInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      generate();
    }
  });
document.getElementById("darkModeToggle").addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add("bg-dark", "text-white");
    document.getElementById("output").classList.remove("bg-white");
    document.getElementById("output").classList.add("bg-secondary");
  } else {
    document.body.classList.remove("bg-dark", "text-white");
    document.getElementById("output").classList.remove("bg-secondary");
    document.getElementById("output").classList.add("bg-white");
  }
});

window.onload = function() {
  displayHistory();
};
