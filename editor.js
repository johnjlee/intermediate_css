function numLeadingSpaces(str) {
  var ignore = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] == '\n') {
      ++ignore;
      continue;
    }
    if (str[i] != ' ') {
      return i - ignore;
    }
  }
  return 0;
}

function trimLeadingSpacesPerLine(str, num) {
  var inputs = str.split(/\n/);
  for (var i = 0; i < inputs.length; ++i) {
    inputs[i] = trimLeadingSpaces(inputs[i], num);
  }

  return inputs.join('\n');
}

function trimLeadingSpaces(str, num) {
  var cutoff = 0;
  var found = false;
  for (var i = 0; i < num && i < str.length; ++i) {
    if (str[i] != ' ') {
      cutoff = i;
      found = true;
      break;
    }
  }

  if (!found) {
    cutoff = num;
  }
  return str.substr(cutoff);
}


function setUpEditors() {
  var editors = document.getElementsByClassName('editor');
  for (var i = 0; i < editors.length; ++i) {
    var textarea = editors[i].getElementsByTagName('textarea')[0];

    // Initially, count the number of spaces at the start of the first
    // line. We will subtract up to this many spaces from the start of
    // every line. This is due to my editor's auto-indenting, which I
    // don't want to get rid of.
    var numSpaces = numLeadingSpaces(textarea.value);
    var newValue = trimLeadingSpacesPerLine(textarea.value, numSpaces);

    // Strip leading and trailing whitespace
    newValue = newValue.trim();
    textarea.value = newValue;

    updateEditor(editors[i]);
    textarea.addEventListener('', onUpdateCode, false);
    textarea.addEventListener('keyup', onUpdateCode, false);
    textarea.addEventListener('change', onUpdateCode, false);
  }
}

function updateEditor(editor) {
  var textarea = editor.getElementsByTagName('textarea')[0];
  var iframe = editor.getElementsByTagName('iframe')[0];
  iframe.contentDocument.body.innerHTML = textarea.value;
}

function onUpdateCode(event) {
  var element = event.target;
  var editor = element.parentElement.parentElement;
  updateEditor(editor);
}
