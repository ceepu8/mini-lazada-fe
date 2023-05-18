(function($) {
	"use strict"

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
	        breakpoint: 991,
	        settings: {
	          slidesToShow: 2,
	          slidesToScroll: 1,
	        }
	      },
	      {
	        breakpoint: 480,
	        settings: {
	          slidesToShow: 1,
	          slidesToScroll: 1,
	        }
	      },
	    ]
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	// Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	/////////////////////////////////////////

	// Input number
	$('.input-number').each(function() {
		var $this = $(this),
		$input = $this.find('input[type="number"]'),
		up = $this.find('.qty-up'),
		down = $this.find('.qty-down');

		down.on('click', function () {
			var value = parseInt($input.val()) - 1;
			value = value < 1 ? 1 : value;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})

		up.on('click', function () {
			var value = parseInt($input.val()) + 1;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})
	});

	// initialize price min input and price max input
	var priceInputMax = document.getElementById('price-max'),
			priceInputMin = document.getElementById('price-min');

	// update click on windows

	/*priceInputMax.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	priceInputMin.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	// update price slider
	
	/*function updatePriceSlider(elem , value) {
		if ( elem.hasClass('price-min') ) {
			console.log(value)
			min = value;
			priceSlider.noUiSlider.set([value, null]);
		} else if ( elem.hasClass('price-max')) {
			console.log(value)
			max = value;
			priceSlider.noUiSlider.set([null, value]);
		}
	}*/

	// filter data 
	const button2 = document.querySelector(".filter-button");
	var count = 0;
	let $savedClassName = $(".pd2");
	const fil1 = document.querySelector(".fil1");
	const fil2 = document.querySelector(".fil2");

	function filterData() {
		axios.get(apiUrl)
		.then(function (response) {
			
			console.log("hello");
			
			
			for(let fil = 8; fil >=  0; fil--)
			{
				searchHid[fil].remove();
			}
			
			for(let g = 0; g < 9; g++)
			{
				if(response.data.products[g].price > fil1.value  && response.data.products[g].price < fil2.value)
				{
					console.log(response.data.products[g].price);
					$(".productFil").append($savedClassName[count]);
					pokemonImage[count].src = response.data.products[g].image;
                    pokemonName[count].innerHTML =  response.data.products[g].name;
                    pokemonPrice[count].innerHTML = response.data.products[g].price;
					count++
				}
			}
			count = 0;

		
		})
		.catch(function (error) {
			pokemonName.innerHTML = "(An error has occurred.)";
			pokemonImage.src = "";
		});
	}

	button2.addEventListener("click", filterData);

	// Price Slider
	var priceSlider = document.getElementById('price-slider');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1, 124000000],
			connect: true,
			step: 1,
			range: {
				'min': 1,
				'max': 124000000
			}
		});

		priceSlider.noUiSlider.on('update', function( values, handle ) {
			var value = values[handle];
			handle ? priceInputMax.value = value : priceInputMin.value = value
		});
	}

})(jQuery);
