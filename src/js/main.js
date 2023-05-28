// Preloader
    $(document).ready(function() {
        $('#preloader').fadeOut(600);
    });

// Scroll Reveal
  var mq = window.matchMedia('all and (min-width: 767px)');
  if(mq.matches) {
    window.sr = ScrollReveal()
    sr.reveal('.inakisoria-logo', {
        duration: 450,
        delay: 400,
        origin: 'bottom',
        distance : '25px',
        scale: 1,
        opacity: 0,
        easing: 'ease'
    });
    sr.reveal('.intro-title', {
        duration: 450,
        delay: 480,
        origin: 'bottom',
        distance : '25px',
        scale: 1,
        opacity: 0,
        easing: 'ease'
    });
    sr.reveal('.intro-text', {
        duration: 450,
        delay: 560,
        origin: 'bottom',
        distance : '25px',
        scale: 1,
        opacity: 0,
        easing: 'ease'
    });
    sr.reveal('.intro-actions', {
        duration: 450,
        delay: 640,
        origin: 'bottom',
        distance : '25px',
        scale: 1,
        opacity: 0,
        easing: 'ease',
    });
    sr.reveal('.mia, .googlehome-message', {
        duration: 500,
        delay: 300,
        origin: 'bottom',
        distance : '40px',
        scale: 1,
        opacity: 0,
        easing: 'ease'
    });
    sr.reveal('.testimonials-cards div', {
        duration: 400,
        delay: 300,
        origin: 'bottom',
        distance : '40px',
        scale: 1,
        opacity: 0,
        easing: 'ease'
    }, 40);
    sr.reveal('.portfolio img', {
        duration: 600,
        delay: 0,
        origin: 'bottom',
        distance : '60px',
        scale: 1,
        opacity: 0,
        easing: 'ease'
    });
  }

// Copy to clipboard
	$(document).ready(function () {
		$(".clipboard").click(function (event) {
			event.preventDefault();
			CopyToClipboard("hi@usamarajpoot.com", true, "Copied to clipboard");
		});
	});

	function CopyToClipboard(value, showNotification, notificationText) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(value).select();
		document.execCommand("copy");
		$temp.remove();
		if (typeof showNotification === 'undefined') {
			showNotification = true;
		}
		if (typeof notificationText === 'undefined') {
			notificationText = "Copied to clipboard";
		}
		var notificationTag = $("div.copy-notification");
		if (showNotification && notificationTag.length == 0) {
			notificationTag = $("<div/>", { "class": "copy-notification", text: notificationText });
			$("body").append(notificationTag);
			notificationTag.fadeIn("slow", function () {
				setTimeout(function () {
					notificationTag.fadeOut("slow", function () {
						notificationTag.remove();
					});
				}, 1000);
			});
		}
	}

// Flickity
	$('.cards').flickity({
		cellAlign: 'left',
		contain: true,
		pageDots: false,
		prevNextButtons: false,
		freeScroll: true,
		freeScrollFriction: 0.03
	});

// Accordion
	$('.collapse').on('show.bs.collapse', function(){
		$(this).parent().find(".accordion-plus").removeClass("accordion-plus").addClass("accordion-minus ");
		$(this).parent().find(".question").removeClass("accordion-inactive").addClass("accordion-active");
	}).on('hide.bs.collapse', function(){
		$(this).parent().find(".accordion-minus").removeClass("accordion-minus").addClass("accordion-plus");
		$(this).parent().find(".question").removeClass("accordion-active").addClass("accordion-inactive");
	});

// Scroll to
    $("a[href='#top']").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    $("a[href='#design']").click(function() {
        var dest = $(this.hash).offset().top;
        $('html,body').animate({
            scrollTop: dest
        }, 500);
        return false;
    });

// Attract hover effect
    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var HoverButton = function () {
      function HoverButton(el) {
        _classCallCheck(this, HoverButton);

        this.el = el;
        this.hover = false;
        this.calculatePosition();
        this.attachEventsListener();
      }

      HoverButton.prototype.attachEventsListener = function attachEventsListener() {
        var _this = this;

        window.addEventListener('mousemove', function (e) {
          return _this.onMouseMove(e);
        });
        window.addEventListener('resize', function (e) {
          return _this.calculatePosition(e);
        });
      };

      HoverButton.prototype.calculatePosition = function calculatePosition() {
        TweenMax.set(this.el, {
          x: 0,
          y: 0,
          scale: 1
        });
        var box = this.el.getBoundingClientRect();
        this.x = box.left + box.width * 0.5;
        this.y = box.top + box.height * 0.5;
        this.width = box.width;
        this.height = box.height;
      };

      HoverButton.prototype.onMouseMove = function onMouseMove(e) {
        var hover = false;
        var hoverArea = this.hover ? 1.5 : 1.5;
        var x = e.clientX - this.x;
        var y = e.clientY - this.y;
        var distance = Math.sqrt(x * x + y * y);
        if (distance < this.width * hoverArea) {
          hover = true;
          if (!this.hover) {
            this.hover = true;
          }
          this.onHover(e.clientX, e.clientY);
        }

        if (!hover && this.hover) {
          this.onLeave();
          this.hover = false;
        }
      };

      HoverButton.prototype.onHover = function onHover(x, y) {
        TweenMax.to(this.el, 0.4, {
          x: (x - this.x) * 0.4,
          y: (y - this.y) * 0.4,
          scale: 1.15,
          ease: Power2.easeOut
        });
        this.el.style.zIndex = 10;
      };

      HoverButton.prototype.onLeave = function onLeave() {
        TweenMax.to(this.el, 0.7, {
          x: 0,
          y: 0,
          scale: 1,
          ease: Elastic.easeOut.config(1.2, 0.4)
        });
        this.el.style.zIndex = 1;
      };

      return HoverButton;
    }();

    var attracter1 = document.querySelector('.scrolltop');
    new HoverButton(attracter1);   

// Waypoints
    $(".scrolltop").fadeOut(1);
    var waypoint = new Waypoint({
        element: document.getElementById('waypoint-scrolltop'),
        handler: function(direction) {
            if (direction === 'down') {
                $(".scrolltop").fadeIn(200);
            }
            else {
                $(".scrolltop").fadeOut(200);
            }
        },
        offset: '40%' 
    })

// Pronunciation
    var x = document.getElementById("audio-inaki"); 
    function playAudio() { 
        x.play(); 
    }

// Quote slider
    $('.quote-slider').hide();
    (function() {
        var quotes = $(".quote-slider");
        var quoteIndex = -1;
        function showNextQuote() {
            ++quoteIndex;
            quotes.eq(quoteIndex % quotes.length)
                .fadeIn(600)
                .delay(3500)
                .fadeOut(600, showNextQuote);
        }
        showNextQuote();
    })(); 