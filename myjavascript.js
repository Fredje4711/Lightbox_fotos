  strTxtMnu = new Array();
  strTxtMnu[0] = "Home";
  strTxtMnu[1] = "Infosessies";
  strTxtMnu[2] = "Cultuur/ontspanning";
  strTxtMnu[3] = "Inschrijven activiteiten";
  strTxtMnu[4] = "Foto's vorige activiteiten";
  strTxtMnu[5] = "Video's";
  strTxtMnu[6] = "Info";
  strTxtMnu[7] = "Download's";
  strTxtMnu[8] = "Contact";

  $(document).ready(function(e) {

    var pgNr = 'A';
    var lightMode = true;

    $(window).resize(function() {});

    $('#wrapper').on('click', function(e) {
      if ($('#Mnu2').css('display') == 'block') {
        $('#Mnu2').height(0);
        setTimeout(function() {
          $('#Mnu2').css('display', 'none');
        }, 1200);
      }
    });

    $.fn.setMode = function(e) {
      lightMode = !lightMode;
      if (lightMode) {
        $('html').css('--pgBackColor', '#ffffff');
        $('html').css('--pgColor', '#333');
        $('html').css('--colorRed', '#ff0000');
        $('html').css('--Mnu1BackColor', '#6f32aa');
        $('html').css('--Mnu1Color', '#ffffff');
        $('html').css('--Mnu1SelColor', '#00dd00');
        $('html').css('--Mnu2BackColor', '#6f32aa');
        $('html').css('--Mnu2Color', '#ffffff');
        $('html').css('--Mnu2SelColor', '#00dd00');
        $('html').css('--linkColor', '#0000ff');
        $('#imgHasselt').attr('src', 'image//HasseltDark.png');
        $('.LogoSize1').each(function() {
          $(this).attr('src', 'https://www.dlml.be/site/image/LogoDLwt.png');
        });
        $('.LogoSize2').each(function() {
          $(this).attr('src', 'https://www.dlml.be/site/image/LogoDLwt.png');
        });
      } else {
        $('html').css('--pgBackColor', '#333');
        $('html').css('--pgColor', '#ffff');
        $('html').css('--colorRed', '#ff7f50');
        $('html').css('--Mnu1BackColor', '#ffffff');
        $('html').css('--Mnu1Color', '#333');
        $('html').css('--Mnu1SelColor', '#0000ff');
        $('html').css('--Mnu2BackColor', '#6f32aa');
        $('html').css('--Mnu2Color', '#ffffff');
        $('html').css('--Mnu2SelColor', '#00dd00');
        $('html').css('--linkColor', '#8080ff');
        $('#imgHasselt').attr('src', 'image//HasseltLight.png');
        $('.LogoSize1').each(function() {
          $(this).attr('src', 'https://www.dlml.be/site/image/LogoDLzw.png');
        });
        $('.LogoSize2').each(function() {
          $(this).attr('src', 'https://www.dlml.be/site/image/LogoDLzw.png');
        });

      }
    };

    // Function to handle page display based on hash
    function showPageFromHash() {
      var hash = window.location.hash;
      if (hash) {
        pgNr = hash.substring(3); // Remove "#pg"
      } else {
        pgNr = 'A'; // Default page
      }
      $.fn.setPg();
    }

    $.fn.setPg = function() {
      $('#pgE video').trigger('pause');
      $('.pgContent').css('display', 'none');
      $('#pg' + pgNr).css('display', 'block');
      $('div[id^="MnuItm1"]').css('color', 'var(--Mnu1Color');
      $('div[id^="MnuItm1"]').css('font-weight', 'normal');
      $('#MnuItm1' + pgNr).css('color', 'var(--Mnu1SelColor)');
      $('#MnuItm1' + pgNr).css('font-weight', 'bold');
      $('div[id^="MnuItm2"]').css('color', 'var(--Mnu2Color');
      $('div[id^="MnuItm2"]').css('font-weight', 'normal');
      $('#MnuItm2' + pgNr).css('color', 'var(--Mnu2SelColor)');
      $('#MnuItm2' + pgNr).css('font-weight', 'bold');
    };

    $('#pgE video').on('load', function() {
      $(this).currentTime(10);
    });

    $('#btnMnu').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if ($('#Mnu2').css('display') == 'block') {
        $('#Mnu2').height(0);
        setTimeout(function() {
          $('#Mnu2').css('display', 'none');
        }, 1200);
      } else {
        $('#Mnu2').css('display', 'block');
        var dh = $('#MnuLst2').height()
        $('#Mnu2').css('display', 'block');
        $('#Mnu2').css('height', dh);
      }
    });

    // Modified menu item click handler
    $('div[id^="MnuItm"]').on('click', function(e) {
      if ($(this).attr('id').slice(-1) == 'I') {
        $.fn.setMode();
      } else {
        pgNr = $(this).attr('id').slice(-1);
        var strActieveMnu = $("label", this).html();
        $('#actieveMnu').html(strActieveMnu);
        window.location.hash = 'pg' + pgNr; // Update the hash
        $.fn.setPg();
      }
    });

    // Load the correct page on initial load and hash changes
    showPageFromHash();
    $(window).on('hashchange', showPageFromHash);
  });