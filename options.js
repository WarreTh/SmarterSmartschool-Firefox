function save_options() {
    var theme = $('#theme').val();
    var img = $('#img').val();
    var colorbg = $('#colorbg').val();
    var colorte = $('#colorte').val();
    var colortb = $('#colortb').val();
    var colortt = $('#colortt').val();
    browser.storage.local.set({
        theme: theme,
        img: img,
        colorbg: colorbg,
        colorte: colorte,
        colortb: colortb,
        colortt: colortt,
//    }).then(() => {
//        reload_tabs();
    });
}

function reload_tabs() {
    browser.tabs.query({url: "*://*.smartschool.be/*"}).then((tabs) => {
        for (let tab of tabs) {
            browser.tabs.reload(tab.id);
        }
    });
}

function theme_change(e) {
    var theme = $('#theme').val();
    if (theme == 'custom') {
        $('#colors').show();
    } else {
        $('#colors').hide();
    }
}

// Restores select box and checkbox state using the preferences
// stored in browser.storage.
function restore_options() {
    browser.storage.local.get({
        theme: 'light',
        img: '',
        colorbg: '#FFFFFF',
        colorte: '#262626',
        colortb: '#FF520E',
        colortt: '#FFFFFF',
    }).then((items) => {
            $('#theme').val(items.theme);
            $('#img').val(items.img);
            $('#colorbg').attr('value', items.colorbg);
            $('#colorte').attr('value', items.colorte);
            $('#colortb').attr('value', items.colortb);
            $('#colortt').attr('value', items.colortt);
            $('.color').minicolors({
                theme: 'bootstrap'
            });
            theme_change();
             // Set the background color of the color pickers
            $('.minicolors-input').each(function() {
                let color = $(this).val();
                $(this).css('background-color', color);
            });
    });
}

$(function () {
    $('#save').click(save_options);
    restore_options();
    $('#theme').change(theme_change);
});


$(document).ready(function() {
    $('.minicolors-input').each(function() {
        $(this).on('change', function() {
            let color = $(this).val();
            $(this).css('background-color', color);
        });
    });
})
