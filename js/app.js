$(document).ready(function () {

    changeLogo()

    $('.accordion__header').click(function (e) {
        e.preventDefault()
        $(".accordion__body").not($(this).next()).slideUp(400);
        $(this).next().slideToggle(400);
        $(".accordion__item").not($(this).closest(".accordion__item")).removeClass("open-accordion");
        $(this).closest(".accordion__item").toggleClass("open-accordion");
    });

    $(".footer__mobmenu a").click(function() {
        var link = $(this);
        var closest_ul = link.closest("ul");
        var parallel_active_links = closest_ul.find(".active")
        var closest_li = link.closest("li");
        var link_status = closest_li.hasClass("active");
        var count = 0;

        closest_ul.find("ul").slideUp(function() {
            if (++count == closest_ul.find("ul").length)
                parallel_active_links.removeClass("active");
        });

        if (!link_status) {
            closest_li.children("ul").slideDown();
            closest_li.addClass("active");
        }
    })

    const $burger = $('.burger');
    const $close = $('.mobile__overlay--close');
    
    $burger.on('click', function (e) {
        e.preventDefault()
        $('.mobile__overlay').addClass('is-open');
    })
    
    $close.on('click', function (e) {
        e.preventDefault()
        $('.mobile__overlay').removeClass('is-open');
    })

    $('.section__slider').slick({
        dots: true,
        speed: 500,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: $('.prev__btn'),
        nextArrow: $('.next__btn'),
        responsive: [{ 
            breakpoint: 768,
            settings: {
                arrows: false
            }
        }]
    })

    $('.hero__slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        fade: true,
        autoplaySpeed: 2000,
        customPaging: function (slider, i) {
            var title = $(slider.$slides[i]).data('title');
            return '<span class="hero__dots"><span class="dots__text">'+ title +'</span> <span class="dots__number">0' + Number(i+1) + ' </span>';
        },
        dotsClass: 'slider-dots',
        responsive: [{ 
            breakpoint: 768,
            settings: {
                customPaging: function(slider, i) {
                    return ''; // Remove button, customize content of "li"
                }
            }
        }]
    });

    $('.offers__list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.prev__btn'),
        nextArrow: $('.next__btn'),
        responsive: [{ 
            breakpoint: 768,
            settings: {
                slidesToShow: 1.18,
                centerMode: true,
            }
        }]
    });

    $(".tab-slider--body").hide();
    $(".tab-slider--body:first").show();

    $(".tab-slider--nav li").click(function() {
        $(".tab-slider--body").hide();
        
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();

        if ($(this).attr("rel") == "tab2") {
            $('.tab-slider--tabs').addClass('slide');
        } else {
            $('.tab-slider--tabs').removeClass('slide');
        }
        
        $(".tab-slider--nav li").removeClass("active");
        $(this).addClass("active");
    });

});

$(function() {
    $(".c-desktop-menu > ul > .menu-item-has-children > a").click(function(e) {
        e.preventDefault();
        $(this).next("ul").toggleClass("js-menu-open");
        $(".c-desktop-menu > ul > .menu-item-has-children > a").not(this).next("ul").removeClass("js-menu-open");
        $(".c-desktop-menu > ul > .menu-item-has-children > a").not(this).removeClass("js-menu-active");
        $(this).toggleClass("js-menu-active");
    });

    $(".sub-menu li:first-child a").click(function(e) {
        e.preventDefault();
        $(".c-desktop-menu > ul > .menu-item-has-children > a").removeClass("js-menu-active")
        $(".sub-menu").removeClass("js-menu-open")
    })
});

let $window = $(window),
    $logoImg = $('header.white .header__logo img'),
    $phoneIcon = $('header.white .header--phone img');

function changeLogo() {
    if ($window.width() < 800) {
        $phoneIcon.attr('src', 'img/phone-2.svg');
        $logoImg.attr('src', 'img/logo-2.svg');
    }
    else if ($window.width() > 800) {
        $phoneIcon.attr('src', 'img/phone.svg');
        $logoImg.attr('src', 'img/logo.svg');
    }
}

$(window).on('resize', function() {
    changeLogo()
})

$(window).on("load", function() {
    changeLogo()
})

$('.header__lang--btn').on('click', function(e) {
    e.preventDefault();
    /* Act on the event */
    $('.lang--dropdown').toggleClass('is-active')
});

$('.header--search-btn').on('click', function(e) {
    e.preventDefault();
    /* Act on the event */
    $('.search--dropdown').addClass('is-active')
});

$('.search--dropdown-close').on('click', function(e) {
    e.preventDefault();
    /* Act on the event */
    $('.search--dropdown').removeClass('is-active')
});