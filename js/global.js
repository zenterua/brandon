/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/

/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

$(function($) {

	"use strict";


	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style, headerHeight;

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
		
		//Take window full size
		$('.fullSizeContent .cell-view').css('height', winH);
		$('.fullSize').css('height', winH);
		
		headerHeight = $('header').outerHeight();
		
		$('.navScroll').css('max-height', winH );
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
	_functions.pageCalculations();
	$('.SelectBox').SumoSelect();

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		_functions.initSwiper();
		$('body').addClass('loaded');
		$('#loader-wrapper').fadeOut();
		
		//Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer',
              },
			stamp: ".stamp"
        });
        
        // filter functions
        var filterFns = {
          // show if number is greater than 50
          numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
          },
          // show if name ends with -ium
          ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
          }
        };
        
        // bind filter button click
        $('.filters-button-group').on( 'click', 'div', function() {
          var filterValue = $( this ).attr('data-filter');
          // use filterFn if matches value
          filterValue = filterFns[ filterValue ] || filterValue;
          $grid.isotope({ filter: filterValue });
        });
        
        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'div', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            //removeCustomClass
            $buttonGroup.find('.active').removeClass('active');
            $( this ).addClass('is-checked');
          });
        });
        
        // bind filter button click
        $('.filters-masonry-button-group').on( 'click', 'div', function() {
          var filterValue = $( this ).attr('data-filter');
          // use filterFn if matches value
          filterValue = filterFns[ filterValue ] || filterValue;
          $grid.isotope({ filter: filterValue });
        });
		
		if ( $(window).scrollTop() > headerHeight ) {
			headerAnimation();
		}
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
		headerAnimation();
	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	$(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
		
		headerAnimation();
		
		//Add animation
		$('body.loaded .reveal-animate').each(function(){
			if( $(this).data('top')<(winScr+winH) ) {
				$(this).addClass('visible');
			}
		});
	};

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('>.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('>.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
				parallax: (_isFF)?($t.data('parallax'), 0): ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
	$(document).on('click', '.open-popup', function(){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	});

	$(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function(){
		$('.popup-wrapper, .popup-content').removeClass('active');
		$('html').removeClass('overflow-hidden');
		setTimeout(function(){
			$('.ajax-popup').remove();
		},300);
		return false;
	});
	
	//Function OpenPopup
	function openPopup(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	}

	//Tabs
	var tabsFinish = 0;
	$('.tab-menu').on('click', function() {
		if($(this).hasClass('active') || tabsFinish) return false;
		tabsFinish = 1;
        var tabsWrapper = $(this).closest('.tabs-block'),
        	tabsMenu = tabsWrapper.find('.tab-menu'),
        	tabsItem = tabsWrapper.find('.tab-entry'),
        	index = tabsMenu.index(this);
        
        tabsItem.filter(':visible').fadeOut(function(){
        	tabsItem.eq(index).fadeIn(function(){
        		tabsFinish = 0;
        	});
        });
        tabsMenu.removeClass('active');
        $(this).addClass('active');
    });

	//Accordeon
	$('.accordeon-title').on('click', function(){
		$(this).closest('.accordeon').find('.accordeon-title').not(this).removeClass('active').next().slideUp();
		$(this).addClass('active').next().slideDown();
	});
    
	//Smooth Scroll
    if(!_ismobile) {
        SmoothScroll({ stepSize: 100 })
    };
	
	//Gallery
    $('.openGalleryPopup').on('click', function(){
    	var index = $(this).index();
    	openPopup('10');
    	swipers['swiper-'+$('.galleryPopup .swiper-container').attr('id')].slideTo(index, 0);
        return false;
    });
	
	//Responsive menu toggle
	$('.menuIcon').on('click', function() {
		$(this).toggleClass('menuIconActive');
		$(this).closest('.headerContentWrapper').find('.navigationWrapper').toggleClass('openMenu');
	});
	
	//Responsive drop down 
	$('nav i.fa').on('click', function() {
		$(this).toggleClass('DDopen');
		$(this).closest('nav ul').find('ul').removeClass('opened');
		$(this).parent().find('> ul').addClass('opened');
		$(this).closest('nav ul').find('ul').not('.opened').slideUp(350);
		$(this).parent().find('> ul').slideToggle(350);
		$(this).closest('nav ul').find('i.fa').not(this).removeClass('DDopen');
	});
	
	//counters
	$('.counterWrapper').viewportChecker({
		offset: 100,
		speed: 3000,
		callbackFunction: function(elem, action){
			elem.find('.numberCounter').countTo();		
		}		
	});
	
	//init reveal animate function
	function revealInit(){
		$('.reveal-animate').each(function(){
			$(this).addClass('no-transition');
			$(this).data('top', $(this).offset().top + $(this).outerHeight());
			$(this).removeClass('no-transition');
		});
	}
	
	if (!_ismobile) {
		revealInit();
	}
	
	//lightbox gallery
	var lightbox = $('.lightbox').simpleLightbox({
		disableScroll: false,
		captionSelector: 'self',
		closeText: '',
		alertErrorMessage: "Error",
		history: false,
		navText: ['','']
	});
	
	//Responsive sidebar
	$('.responsiveSidebar').on('click', function() {
		$(this).parent().find('.sideBar').slideToggle(350);
		$(this).find('.fa').toggleClass('DDopen');
	});
	
	//Header scroll animation
	function headerAnimation() {
		if ( $(window).scrollTop() > headerHeight && winW > 991 ) {
			$('header').addClass('pageScrolled');
		} else {
			$('header').removeClass('pageScrolled');
		}
		
		if ( $(window).scrollTop() > headerHeight + 50 && winW < 992 ) {
			$('header').addClass('headerAnimated');
		} else {
			$('header').removeClass('headerAnimated');
		}
	}

});