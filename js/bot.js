var conversation = [
  {
    user: true,
    sentence: false,
    eo: 'Saluton',
    en: 'Hello',
    alts: [],
    buttons: [
      'n', 'S', 'l', 'a', 'u', 't', 'o',
    ],
  },
  {
    user: false,
    sentence: true,
    eo: 'Saluton, kiel vi fartas?',
    en: 'Hello, how are you?',
    alts: [],
    buttons: [],
  },
  {
    user: true,
    sentence: true,
    eo: 'Mi fartas bone kaj vi?',
    en: 'I\'m well thanks and you?',
    alts: [
      'Mi bone fartas kaj vi?',
    ],
    buttons: [
      'Mi', 'kaj', 'vi?', 'bone', 'fartas',
    ],
  },
  {
    user: false,
    sentence: true,
    eo: 'Mi fartas bonege dankon!',
    en: 'I\'m great thanks!',
    alts: [],
    buttons: [],
  },
  {
    user: false,
    sentence: true,
    eo: 'Ĝis poste!',
    en: 'See you later!',
    alts: [],
    buttons: [],
  },
  {
    user: true,
    sentence: true,
    eo: 'Ĝis poste',
    en: 'See you later',
    alts: [],
    buttons: [
      'poste', 'Ĝis',
    ],
  },
];

$(function() {
  var addNewPart = function(part) {
    var $messages = $('.messages');
    var $message = $('#message-template').clone();

    $message.removeClass('message-template');
    $message.addClass('message');

    $message.find('img').attr('src', part.user ? '/images/esperanto/m1.png' : '/images/esperanto/f1.png');
    $message.find('.eo').html(part.user ? '&nbsp;' : part.eo);
    $message.find('.en').html(part.en);

    $messages.append($message);

    var addAnswerButtons = function() {
      if (part.user) {
        var $buttons = $('.conversation .input .buttons');
        $buttons.empty();

        for (var i=0; i<part.buttons.length; i++) {
          var $button = $('<div>').addClass('button').text(part.buttons[i]);
          $buttons.append($button);
        }
      }
    };

    addAnswerButtons();

    var validAnswerFn = null;
    var invalidAnswerFn = null;

    var onValidAnswer = function(fn) {
      validAnswerFn = fn;
    };

    var onInvalidAnswer = function(fn) {
      invalidAnswerFn = fn;
    };

    var answer = '';

    var addAnswerWord = function(word) {
      answer += word;

      if (part.sentence) {
        answer += ' ';
      }

      $message.find('.eo').html(answer);

      verifyAnswer();
    };

    var verifyAnswer = function() {
      var trimmed = answer.trim();
      var len = part.sentence ? trimmed.split(' ').length : trimmed.length;

      if (len === part.buttons.length) {
        var valid = trimmed === part.eo;

        if (!valid) {
          for (var i=0; i<part.alts.length; i++) {
            if (trimmed === part.alts[i]) {
              valid = true;
              break;
            }
          }
        }

        if (valid) {
          validAnswerFn && validAnswerFn(false);
        } else {
          invalidAnswerFn && invalidAnswerFn(trimmed);
        }
      }
    };

    var resetAnswer = function() {
      answer = '';

      setTimeout(function() {
        $message.find('.eo').html('&nbsp;');
        addAnswerButtons();
      }, 1000);
    };

    var skipAnswer = function() {
      answer = part.eo;
      $('.conversation .input .buttons .button').addClass('selected');
      $message.find('.eo').html(answer);
      validAnswerFn(true);
    };

    if (!part.user) {
      setTimeout(function() {
        validAnswerFn(false);
      }, 1000);
    }

    return {
      onValidAnswer: onValidAnswer,
      onInvalidAnswer: onInvalidAnswer,
      addAnswerWord: addAnswerWord,
      resetAnswer: resetAnswer,
      skipAnswer: skipAnswer,
    };
  };

  var partIndex = 0;
  var currentPart;

  var addNextPart = function() {
    var part = conversation[partIndex];

    if (!part) {
      $('.conversation .input .mistake').hide();
      $('.conversation .input .buttons').hide();
      $('.conversation .input .skip').hide();
      $('.conversation .input .complete').show();
      return;
    }

    currentPart = addNewPart(part);

    currentPart.onValidAnswer(function(skipped) {
      $('.conversation .input .mistake').hide();

      if (part.user) {
        if (!skipped) {
          $('.conversation .clap').show();
        }

        $('.conversation .input .skip').hide();
      }

      setTimeout(function() {
        var interactive = addNextPart();
        $('.conversation .clap').hide();

        if (interactive) {
          $('.conversation .input .skip').show();
        }
      }, 1500);
    });

    currentPart.onInvalidAnswer(function(answer) {
      currentPart.resetAnswer();

      var $mistake = $('.conversation .input .mistake');

      $mistake.html('You said: <b>' + answer + '</b><br />That\'s not quite right, but give it another shot!');
      $mistake.show();
    });

    partIndex += 1;
    return part.user;
  };

  $('.conversation .input .buttons').on('click', '.button', function() {
    if ($(this).hasClass('selected')) {
      return;
    }

    $(this).addClass('selected');
    currentPart.addAnswerWord($(this).text().trim());
  });

  $('.conversation .input .skip').on('click', function(e) {
    e.preventDefault();
    currentPart.skipAnswer();
    return false;
  });

  addNextPart();
});
