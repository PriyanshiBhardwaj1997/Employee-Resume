$(document).ready(function() {
	$('a[href*=#]').bind('click', function(e) {
		e.preventDefault(); // prevent hard jump, the default behavior

		var target = $(this).attr("href"); // Set the target as variable

		// perform animated scrolling by getting top-position of target-element and set it as scroll target
		$('html, body').stop().animate({
			scrollTop: $(target).offset().top
		}, 600, function() {
			location.hash = target; //attach the hash (#jumptarget) to the pageurl
		});

		return false;
	});
	$('.heroSlider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: true,
		arrows: false,
		dots: false,
		fade: true,
		speed: 500,
		// animateOut: 'fadeOut',
		// animateIn: 'fadeIn',
		// infinite: true,
		autoplay:true,
		// cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
		touchThreshold: 100
	})
});

$(window).scroll(function() {
	var scrollDistance = $(window).scrollTop();

	// Show/hide menu on scroll
	//if (scrollDistance >= 850) {
	//		$('nav').fadeIn("fast");
	//} else {
	//		$('nav').fadeOut("fast");
	//}

	// Assign active class to nav links while scolling
	$('.default-section').each(function(i) {
		if ($(this).position().top <= scrollDistance) {
			$('.navbar-nav a.active').removeClass('active');
			$('.navbar-nav a').eq(i).addClass('active');
		}
	});
	var sticky = $('.sticky'),
		scroll = $(window).scrollTop();

	if (scroll >= 100) sticky.addClass('fixed');
	else sticky.removeClass('fixed');
}).scroll();


