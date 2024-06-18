'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            FIlter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.filter__gallery').length > 0) {
            var containerEl = document.querySelector('.filter__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });
    
    /*------------------
		Pop-up Button
	--------------------*/
    function togglePopup() {
        var popup = document.getElementById('popupForm');
        if (popup.style.display === 'block') {
            popup.style.display = 'none';
        } else {
            popup.style.display = 'block';
        }
    }
    
    function submitForm(event) {
        event.preventDefault(); 
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;
        
        // Adicionar validações ou enviar os dados para algum serviço/processamento      
        // Requisição AJAX usando fetch API
        fetch('url_do_seu_servidor_aqui', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            }),
        })
        .then(response => {
            console.log('Dados enviados com sucesso!');
            document.getElementById('contactForm').reset();
            document.getElementById('popupForm').style.display = 'none';
        })
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
        });
    }
    
    /*------------------
		Hero Slider
	--------------------*/
    var hero_s = $(".hero__slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        nav: true,
        navText: ["<span class='arrow_carrot-left'></span>", "<span class='arrow_carrot-right'></span>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------
    Characters
    --------------------*/

    const characters = document.querySelectorAll('.character');

    characters.forEach((character) => {
        character.addEventListener('click', () => {
            removeSelectedCard();
            character.classList.add('selected');
            changeMainImage(character);
            changeMainCharacterName(character);
            changeDescription(character);
        });
    });

    function removeSelectedCard() {
        characters.forEach((character) => {
            character.classList.remove('selected');
        });
    }
    
    function changeMainImage(character) {
        const mainImage = document.querySelector('.selected-character .main');
        const characterImage = character.querySelector('img');
        mainImage.src = characterImage.src;
        mainImage.alt = characterImage.alt;
    }
    
    function changeMainCharacterName(character) {
        const characterName = document.getElementById('character-name');
        characterName.textContent = character.dataset.name;
    }
    
    function changeDescription(character) {
        const description = document.getElementById('description');
        description.textContent = character.dataset.description;
    }


    /*------------------
        Video Player
    --------------------*/
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'fullscreen'],
        seekTime: 25
    });

    /*------------------
        Niceselect
    --------------------*/
    $('select').niceSelect();

    /*------------------
        Scroll To Top
    --------------------*/
    $("#scrollToTopButton").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
     });

      /*------------------
        Validations
    --------------------*/
    document.getElementById('emailInput').addEventListener('input', function() {
        const emailInput = this;
        const checkIcon = document.getElementById('emailCheckIcon');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() !== '' && emailPattern.test(emailInput.value)) {
            checkIcon.style.display = 'block';
        } else {
            checkIcon.style.display = 'none';
        }
    });  

    document.getElementById('passwordInput').addEventListener('input', function() {
        const passwordInput = this;
        const checkIcon = document.getElementById('passwordCheckIcon');

        const isValidPassword = passwordInput.value.trim().length >= 8;

        if (isValidPassword) {
            checkIcon.style.display = 'block';
        } else {
            checkIcon.style.display = 'none';
        }
    });

    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function () {
            const input = document.querySelector('#passwordInput');
            const iconImg = this.querySelector('img');
    
            this.classList.toggle('active');
    
            if (input.type === 'password') {
                input.type = 'text';
                iconImg.src = '/img/Estilização/Imagens/sharingan-eye.png';
            } else {
                input.type = 'password';
                iconImg.src = '/img/Estilização/Imagens/eye-satoru-gojo.png';
            }
        });
    });
    
          /*------------------
        Social Conection
    --------------------*/

    $(document).ready(function(){
        $('.facebook').click(function(e){
            e.preventDefault();
            window.open('https://www.facebook.com', 'newwindow', 'width=600, height=400');
        });
        $('.google').click(function(e){
            e.preventDefault();
            window.open('https://www.google.com', 'newwindow', 'width=600, height=400');
        });
        $('.twitter').click(function(e){
            e.preventDefault();
            window.open('https://www.twitter.com', 'newwindow', 'width=600, height=400');
        });
    });






})(jQuery);