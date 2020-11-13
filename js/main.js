'use strict';

$(function ()
{      

	

	$("input[type=tel]").mask("+7 (999) 999-99-99");

	
    $('.tel-link a').on('click', function(e){
        e.preventDefault();
        $('#tel-modal').modal('show');
    });
    
    // $('#tel-modal2').modal('show');
    $('.how-buy .how-buy-link a').on('click', function(e){
        e.preventDefault();
        $('#tel-modal2').modal('show');
    });

    $('.add-product .how-buy-link a').on('click', function(e){
        e.preventDefault();
        $('#tel-modal3').modal('show');
    });

    // $('#tel-modal3').modal('show');
    $('.slider-link a').on('click', function(e){
        e.preventDefault();
        $('#tel-modal').modal('show');
    });

    
    $('.questions-opener').on('click', function(e){
    	$(this).toggleClass('open');
    	$('.hidden-questions').toggleClass('opened');
    	e.preventDefault();
    	$('html, body').stop().animate({
            scrollTop: $('.answer').offset().top
        }, 777);
    });

    $('.testimonials-opener').on('click', function(e){
    	$(this).toggleClass("open");
    	$('.hidden-testimonials').toggleClass('opened');
    	e.preventDefault(); 
    	$('html, body').stop().animate({
            scrollTop: $('#testimonials').offset().top
        }, 777);	
    });
    
    window.onscroll = function() {myFunction()};

	// Берём высоту хедера
	var header = document.getElementById("menu");

	// Get the offset position of the navbar
	var sticky = header.offsetTop;

	// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
	function myFunction() {
		  if (window.pageYOffset > sticky) {
		    header.classList.add("sticky");
		    $('.slider').css('padding-top','126px');
		  } else {
		    header.classList.remove("sticky");
		    $('.slider').css('padding-top','90px');
		  }
	}

	$(".menu .nav-link,.footer-products ul li a").on("click", function (e) {
		$('.menu .nav-link').removeClass('active');
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 777);
        e.preventDefault();
        return false;
    });

    var geo = "";
		$.get("https://ipinfo.io", function(response) {
			var city = response.city;
	   		var region = response.region;
	   		var country = response.country;
		    geo = city + ", " + region + ", " + country;
		    console.log(geo);
		}, "jsonp");

	$('form').submit(function(e) {
			
		e.preventDefault();
		
		var element = this; 
		
   		
		$(element).append("<input type='hidden' name='country' value='" + geo +"'>");
		$(element).append("<input type='hidden' name='come_fr' value='" + document.referrer +"'>");	

		var form_data = $(this).serialize();


		var submit = $(this).find('.description-form');
		$('<div class="captcha-block"><div class="none"></div>').insertAfter(submit);
		var submit = $(this).find('.captcha-block div');
		$('<label id="ebcaptchatext"></label>').insertAfter(submit);
		$('<input type="text" class="textbox" placehodler="Результат" id="ebcaptchainput" required data-error="Пожалуйста решите задачу"/><div class="help-block with-errors">Пожалуйста решите задачу</div>').insertAfter(submit);
		var input = $(this).find('#ebcaptchainput'); 
		var label = $(this).find('#ebcaptchatext'); 
		
		$(element).find('button[type=submit]').attr('disabled','disabled'); 

		
		var randomNr1 = 0; 
		var randomNr2 = 0;
		var totalNr = 0;


		randomNr1 = Math.floor(Math.random()*10);
		randomNr2 = Math.floor(Math.random()*10);
		totalNr = randomNr1 + randomNr2;
		var texti = randomNr1+" + "+randomNr2+" = ";
		//var texti = "What is "+randomNr1+" + "+randomNr2;
		$(label).text(texti);
		
	
		$(input).keyup(function(){

			var nr = $(this).val();
			if(nr==totalNr)
			{
				$(element).find('button[type=submit]').removeAttr('disabled');
				
				$(element).find('button[type=submit]').on('click',function(e){


					
					var form = $(element);
		            var btn = $(element).find("button:focus");
		            var button_val = btn.html();
		            btn.attr('disabled',true).html('Отправляается...').addClass('disabled');
		            
		             //собераем все данные из формы
		            $.ajax({
			            type: "POST", //Метод отправки
			            url: "formdata.php", //путь до php фаила отправителя
			            data: form_data,
			            success: function(data) {
			                   //код в этом блоке выполняется при успешной отправке сообщения
			                   console.log(data);
			                   $(element).trigger('reset');
			                   btn.attr('disabled',false).html(button_val).removeClass('disabled');
			                   $('.modal').modal('hide');
			                   $('#success-modal').modal('show');
			                   $(element).find('.captcha-block').remove();
			                   location.reload();
			            }

			        });	
				});
							
			}
			else{
				$(element).find('button[type=submit]').attr('disabled','disabled');
			}
			
		});


        $(document).keypress(function(e)
		{
			if(e.which==13)
			{
				if((element).find('button[type=submit]').is(':disabled')===true)
				{
					e.preventDefault();
					return false;
				}
			}

		});


    });


    jQuery.fn.ebcaptcha = function(options){

		var element = this; 
		var submit = $(this).find('.description-form');
		$('<div class="captcha-block"><div class="none"></div>').insertAfter(submit);
		var submit = $(this).find('.captcha-block div');
		$('<label id="ebcaptchatext"></label>').insertAfter(submit);
		$('<input type="text" class="textbox" placehodler="Результат" id="ebcaptchainput" required data-error="Пожалуйста решите задачу"/><div class="help-block with-errors">Пожалуйста решите задачу</div>').insertAfter(submit);
		var input = this.find('#ebcaptchainput'); 
		var label = this.find('#ebcaptchatext'); 
		
		$(element).find('button[type=submit]').attr('disabled','disabled'); 

		
		var randomNr1 = 0; 
		var randomNr2 = 0;
		var totalNr = 0;


		randomNr1 = Math.floor(Math.random()*10);
		randomNr2 = Math.floor(Math.random()*10);
		totalNr = randomNr1 + randomNr2;
		var texti = randomNr1+" + "+randomNr2+" = ";
		//var texti = "What is "+randomNr1+" + "+randomNr2;
		$(label).text(texti);
		
	
		$(input).keyup(function(){

			var nr = $(this).val();
			if(nr==totalNr)
			{
				$(element).find('button[type=submit]').removeAttr('disabled');				
			}
			else{
				$(element).find('button[type=submit]').attr('disabled','disabled');
			}
			
		});

		$(document).keypress(function(e)
		{
			if(e.which==13)
			{
				if((element).find('button[type=submit]').is(':disabled')===true)
				{
					e.preventDefault();
					return false;
				}
			}

		});

	};


});



