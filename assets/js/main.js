/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.


	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('.imagepop').poptrox({
					caption:  {selector: 'title' }, //function($a) { return $a.next('h3').text();}
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});
	
	// Lazy Loading
		document.addEventListener("DOMContentLoaded", function() {
			var lazyloadImages;    
		
			if ("IntersectionObserver" in window) {
			lazyloadImages = document.querySelectorAll(".lazy");
			var imageObserver = new IntersectionObserver(function(entries, observer) {
				entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					var image = entry.target;
					image.src = image.dataset.src;
					image.classList.remove("lazy");
					imageObserver.unobserve(image);
					image.style.transition = "opacity 0.5s ease-in-out"; // Add transition property
                    image.style.opacity = 1; // Set opacity to 1 to trigger the transition
				}
				});
			});
		
			lazyloadImages.forEach(function(image) {
				imageObserver.observe(image);
				// Set initial opacity to 0 for the lazy-loaded images
				image.style.opacity = 0;
			});
			} else {  
			var lazyloadThrottleTimeout;
			lazyloadImages = document.querySelectorAll(".lazy");
			
			function lazyload () {
				if(lazyloadThrottleTimeout) {
				clearTimeout(lazyloadThrottleTimeout);
				}    
		
				lazyloadThrottleTimeout = setTimeout(function() {
				var scrollTop = window.scrollY;
				lazyloadImages.forEach(function(img) {
					if(img.offsetTop < (window.innerHeight + scrollTop)) {
						img.src = img.dataset.src;
						img.classList.remove('lazy');
						img.style.transition = "opacity 0.5s ease-in-out"; // Add transition property
                        img.style.opacity = 1; // Set opacity to 1 to trigger the transition
					}
				});
				if(lazyloadImages.length == 0) { 
					document.removeEventListener("scroll", lazyload);
					window.removeEventListener("resize", lazyload);
					window.removeEventListener("orientationChange", lazyload);
				}
				}, 20);
			}
		
			document.addEventListener("scroll", lazyload);
			window.addEventListener("resize", lazyload);
			window.addEventListener("orientationChange", lazyload);
			}
		})



		// scroll debouncing whenever any demo binds an event to a scroll event: you should consider debouncing when binding...
		// functions to scroll events, because if you don’t, it’ll get called a zillion times and could be slow.
		const debounce = (func, delay) => {
			let timeoutId;
			return function() {
				const context = this;
				const args = arguments;
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					func.apply(context, args);
				}, delay);
			};
		};

		// Navbar fixed to top of screen when scrolling down.
		const navbar = document.getElementById("navbar-wrapper");
		const placeholder = document.getElementById("navbar-placeholder");
		const offset = navbar.offsetTop; // Get the offset position of the navbar 
		
		// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
		function fixFunction() {
		if (window.scrollY >= offset ) {
			navbar.classList.add("sticky");
			placeholder.style.height = `${navbar.offsetHeight}px`; // Set placeholder height
		} else {
			navbar.classList.remove("sticky");
			placeholder.style.height = '0'; // Reset placeholder height
		}
		} 

		// Use debounce to prevent the function from being called too frequently
		const debouncedFixFunction = debounce(fixFunction, 2);

		// Use requestAnimationFrame for smoother animations during scrolling.
		function scrollHandler() {
		    requestAnimationFrame(() => {
		        debouncedFixFunction();
		    });
		}

		// Event listener for the scroll event
		window.onscroll = function() {scrollHandler()};

		

		// Mobile Navbar Submenu Dropdown
		document.addEventListener('DOMContentLoaded', function () {
            const portfolioItem = document.getElementById('portfolioItem');
            const submenu = document.querySelector('.mobile-navbar-submenu');

            portfolioItem.addEventListener('click', function () {
                // Toggle the 'open' class for the submenu
                submenu.classList.toggle('open');
            });
        });

})(jQuery);