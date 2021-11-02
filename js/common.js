$(function () {

    if ($('#selection').length) {
        startSelection()
    }
    if (('#calc_form').length) {
        startCalculate()
    }

});

//денежный формат
function number_format(number, decimals, dec_point, thousands_sep) {
    var i, j, kw, kd, km;
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (dec_point == undefined) {
        dec_point = ',';
    }
    if (thousands_sep == undefined) {
        thousands_sep = '.';
    }
    i = parseInt(number = (+number || 0).toFixed(decimals)) + '';
    if ((j = i.length) > 3) {
        j = j % 3;
    } else {
        j = 0;
    }
    km = (j ? i.substr(0, j) + thousands_sep : '');
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands_sep);
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : '');
    return km + kw + kd;
}

//фукнция склонения
function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}


$(window).on('load', function () {
    $preloader = $('.loaderArea'),
        $loader = $preloader.find('.loader');
    $loader.fadeOut();
    $preloader.fadeOut('slow');
});

$(window).on("load", function () {

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    let val = 0
    let month = $('#month')
    let over = $('#over')
    let total = 0

    $("input[type='range']").on('input', function () {
        val = $(this).val()
        $(this).prev().val(val)
        calculation()
    })

    $("input[type='number']").on('input', function () {
        val = $(this).val()
        $(this).next().val(val)
        calculation()
    })

    function calculation() {
        let cost = parseInt($('#cost').val())
        let time = parseInt($('#time').val())
        let deposit = parseInt($('#deposit').val())
        let bet = parseFloat($('#bet').val())


        if (cost >= '' && time >= '' && deposit >= '' && bet >= '') {
            total = cost - deposit
            $('#summ').text(total)
            $('#years').text(time)
            $('#percent').text(bet)
            let i,
                koef,
                result;
            i = (bet / 12) / 100;
            koef = (i * (Math.pow(1 + i, time * 12))) / (Math.pow(1 + i, time * 12) - 1);

            result = total * koef;
            month.text(result.toFixed())
            over.text(result.toFixed() * time * 12 - cost)

        } else return 0
    }
});

function startCalculate() {
    
    var $ipFirst = $('#ipFirst');
    var percentIpFirstMin = +$ipFirst.attr('data-per-min') / 100;
    var percentIpFirstMax = +$ipFirst.attr('data-per-max') / 100;

    $ipFirst.ionRangeSlider({
        skin: "big",
        from: $(this).attr('data-from'),
        step: $(this).attr('data-step'),
        onStart: function (data) {
            $('#deposit').val(data.from)
            calculation()
        },
        onChange: function (data) {
            $('#deposit').val(data.from)
            calculation()
        }
    })

    $('#ipCost').ionRangeSlider({
        min: $(this).attr('data-min'),
        skin: "big",
        max: $(this).attr('data-max'),
        from: $(this).attr('data-from'),
        step: $(this).attr('data-step'),
        onStart: function (data) {
            $('#cost').val(data.from)
            changeMin(data.from)
            calculation()
        },
        onChange: function (data) {
            $('#cost').val(data.from)
            changeMin(data.from)
            calculation()
        }
    });

    $('#ipPercent').ionRangeSlider({
        min: $(this).attr('data-min'),
        skin: "big",
        max: $(this).attr('data-max'),
        from: $(this).attr('data-from'),
        step: $(this).attr('data-step'),
        onStart: function (data) {
            $('#bet').val(data.from)
            calculation()
        },
        onChange: function (data) {
            $('#bet').val(data.from)
            calculation()
        }
    });

    $('#ipTime').ionRangeSlider({
        min: $(this).attr('data-min'),
        skin: "big",
        max: $(this).attr('data-max'),
        from: $(this).attr('data-from'),
        step: $(this).attr('data-step'),
        onStart: function (data) {
            $('#time').val(data.from)
            calculation()
        },
        onChange: function (data) {
            $('#time').val(data.from)
            calculation()
        }
    });

    $('.calc__val').on("input", function () {
        var $instance = $(this).siblings(".js-range-slider").data("ionRangeSlider");
        var val = $(this).inputmask('unmaskedvalue')
        $instance.update({
            from: val
        })
        calculation()
    });

    $('.calc__val').on("change", function () {
        var min = 1 * $(this).siblings(".js-range-slider").attr('data-min');
        var max = 1 * $(this).siblings(".js-range-slider").attr('data-max');
        var $instance = $(this).siblings(".js-range-slider").data("ionRangeSlider");
        var val = $(this).inputmask('unmaskedvalue')
        if ($(this).attr('data-point')) {
            val = (1 * val).toFixed(1);
            $(this).val(val)
        } else {
            val = (1 * val).toFixed();
        }
        var validValue = val * 1
        if (val < min) {
            validValue = min;
        } else if (val > max) {
            validValue = max;
        }

        $(this).val(validValue);
        $instance.update({
            from: validValue
        })
        if ($(this).attr('id') == 'cost') {
            changeMin(validValue)
        }
        calculation()
    });
    
    function changeMin(value) {
        var $inst = $ipFirst.data("ionRangeSlider");
        var minValue = value * percentIpFirstMin;
        var maxValue = value * percentIpFirstMax;

        $inst.update({
            min: minValue,
            max: maxValue
        })
        $ipFirst.attr('data-min', minValue)
        $ipFirst.attr('data-max', maxValue)

        var validValue = 1 * (+$ipFirst.val()).toFixed();
        if (validValue < minValue) {
            validValue = minValue;
        } else if (validValue > maxValue) {
            validValue = maxValue;
        }
        $('#deposit').val(validValue);
        $ipFirst.data("ionRangeSlider").update({
            from: validValue,
            min: minValue,
            max: maxValue
        });
    }

    function calculation() {
        var cost = +($('#ipCost').val())
        var time = +($('#time').val())
        var deposit = +($ipFirst.val())
        var bet = +($('#bet').val())

        var sum_credit = cost - deposit; //сумма кредита
        var inMonth = time * 12
        // var inMonth = time
        $('#summ').text(number_format((sum_credit), 0, '', ' '))
        $('#years').text(time)
        // $('#percent').text(bet)
        // percent = bet / 12 / 100
        var bet = +($('#bet').val()) / 12 / 100
        var month_payment = Math.round(sum_credit * (bet + (bet / (Math.pow(1 + bet, inMonth) - 1))));

        $('#inMonth').text(number_format(month_payment.toFixed(), 0, '', ' '))
        // $('#over').text((number_format((pereplata.toFixed()), 0, '', ' ')))
    }
}