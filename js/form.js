var regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i;
var regName = /^[a-zA-Z\s]+$/i;
var regNameRus = /^[А-Яа-яЁё\-'\s]+$/i;
var regPass = /^[a-zA-Z0-9]+$/i;
var regPass = /^[a-zA-Z0-9]+$/i;
var regDate = /(\d{2}\.\d{2}\.\d{4})/;
var regNum = /^\d+$/;
var regCardSum = /^[0-9\.\,]+$/;
var regSNPassport = /(\d{4}\s\d{6})/;
var regCodePassport = /(\d{3}\-\d{3})/;
var regSnils = /(\d{3}\-\d{3}\-\d{3}\s\d{2})/;

var regRusfield = /^[А-Яа-яЁё0-9\-\s.]+$/i;
var regAddressNum = /^[А-Яа-яЁё0-9\-\/().]+$/i;
//var regRusfield = /^[А-яA-z0-9\-_!,.:+=?)(]*$/;




function validateForm($form) {
    var error = 0;
    $form.find('.validate:visible').each(function(){
        if (!validateField($(this))) {
            error++;
        }
    });
    if (error > 0) {
        //$('body').stop().scrollTo($('.error:visible').first().offset().top - 150, 200, {axis:'y'});
        return false;
    } else {
        return true;
    }
}

//функция проверки корректности заполненения полей
//на вход тип проверки, значение, placeholder
function validateField($field) {

    var error = 0;
    var message = '';

    var val = jQuery.trim($field.val());
    var plh = $field.data('placeholder');
    var type = $field.data('validate');

    switch(type){

        //обязательно для заполнения
        case 'required':
            //console.log(val);
            if (val == ''){
                error++;
                message = 'Поле обязательно для заполнения';
            }
            break;

        //select обязательно для заполнения
        case 'required_select':
            val = $field.find('select').val();
            if (val == null){
                error++;
                message = 'Поле обязательно для заполнения';
            }
            break;

        //номер телефона
        case 'number_phone':
            val = val.replace('+7 ', '');
            val = val.replace(/[()\_-\s]/g, '');
            if (val == '' || val.search(regNum) == -1 || val.length != 10) {
                error++;
                message = 'Укажите корректный номер телефона';
            }
            break;

        //дата рождения
        case 'date_birthday':
            if (val.search(regDate) == -1) {
                error++;
                message = 'Дата в формате дд.мм.гггг';

            } else {
                var d = val.split('.');
                //месяц с 0 поэтому вычитаем
                var day = d[0] * 1;
                var month = d[1]*1 - 1;
                var year = d[2] * 1;

                var dateCur = moment([year, month, day]);
                var dateNow = moment();
                
                //проверка на корректность даты
                if (dateCur.isValid() == 'Invalid date' || dateCur.isValid() == false || dateCur > dateNow) {
                    error++;
                    message = 'Укажите верную дату'

                } else if (dateNow.diff(dateCur, 'years') < 18) {
                    error++;
                    message = 'Возраст не менее 18 лет';
                }
            }
            
            break;

        //email
        case 'email':
            if (val == '' || val.search(regEmail) == -1 || val.length > 50) {
                error++;
                message = 'Укажите корректный адрес электронной почты';
            }   
            break;  

        // checkbox
        case 'checkbox':
            var $checkbox = $field.find('input:checked');
            if (!$checkbox.length) {
                error++;
                message = 'выберите вариант';
            }   
            break; 

        /*русские символы + спец.символы для фио*/
        case 'rusfield':
            if (val == '' || val.search(regNameRus) == -1 ||  val.length > 50 || val.length < 2) {
                error++;
                message = 'Только русские буквы, до 50 символов';
            } 
            break;
    }

    //если поле заполнено не корректно
    //возвращаем 
    if (error > 0) {
        $field.parent().find('.error-message').text(message);
        $field.parent().removeClass('success').addClass('error');

        return false;

    } else {
        $field.parent().removeClass('error').addClass('success');
        $field.parent().find('.error-message').text('');

        return true;
    }
}

//ф-я очистки формы
//на вход объект формы
function clearForm($form) {
    $form.find('.validate').each(function(){
        var plh = $(this).data('placeholder');
        var val = '';
        if (plh != undefined) {
            //val = plh;
        }
        //console.log(val);
        $(this).val('').parent().removeClass('success error').addClass('empty');
    });
}

//placeholders
function initPlaceholders() {
    //console.log('init');
    $('.placeholder')
        .each(function(){
            var $this = $(this);
            var $field = $this.parent();
            var plh = $this.data('placeholder');
            var val = $.trim($this.val());
            if ((val == '' || val == plh) &&  plh != '' && plh != undefined) {
                $field.addClass('empty');
            } else {
                $field.removeClass('empty');
            }

            $field.prepend('<span class="label">'+plh+'</span>');

        })
        .on('focus', function(){
            if (!$(this).prop('readonly')) {
                $(this).parent().removeClass('empty');
            }
            
        })
        .on('blur', function(){
            var $this = $(this);
            var $field = $this.parent();
            var val  = $.trim($(this).val());
            var plh  = $(this).data('placeholder');

            if (val == '') {
                $field.removeClass('error success').addClass('empty');
            } 
        });
}

//маска ввода для полей ввода
function maskedInput() {
    $('.masked-input')
        .each(function(){
            $(this).mask($(this).data('mask'));
        })
        .on('change', function(){
            clearMask($(this));
        });

}

//очистка маски ввода
function clearMask($field) {
    var val = $field.val();
    var mask = $field.data('mask');//.replace(/[9]/g, '_');
    console.log(val+' = '+mask);
    //если значение совпадает с маской ввода - очищаем значение
    if (val == mask) {
        $field.val('');
        $field.parent().addClass('empty').removeClass('success error');
    }
}