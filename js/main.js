console.log('Script carregado');

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        setTimeout(function () {
            $("#preloder").fadeOut("slow");
        }, 200);

        /*------------------
            Filter
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
        if (popup) { // Verifique se o elemento existe
            if (popup.style.display === 'block') {
                popup.style.display = 'none';
            } else {
                popup.style.display = 'block';
            }
        } else {
            console.error('Popup Form não encontrado');
        }
    }
    
    // Adicione verificação de existência antes de adicionar event listeners
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do formulário
        
            const email = document.getElementById('emailInput').value;
            const nickname = document.getElementById('nicknameInput').value;
            const password = document.getElementById('passwordInput').value;
        
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, nickname, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    document.getElementById('success-message').textContent = data.message;
                    document.getElementById('error-message').textContent = ''; // Limpa a mensagem de erro
                } else if (data.errors) {
                    document.getElementById('error-message').textContent = data.errors.map(err => err.msg).join(', ');
                    document.getElementById('success-message').textContent = ''; // Limpa a mensagem de sucesso
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                document.getElementById('error-message').textContent = 'Ocorreu um erro durante o cadastro.';
            });
        });
    } else {
        console.error('Signup Form não encontrado');
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        // Função de manipulação do formulário de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Impede o comportamento padrão do formulário
        
                const email = document.getElementById('emailInput').value;
                const password = document.getElementById('passwordInput').value;
        
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        document.getElementById('success-message').textContent = data.message;
                        document.getElementById('error-message').textContent = '';
                    } else if (data.errors) {
                        document.getElementById('error-message').textContent = data.errors.map(err => err.msg).join(', ');
                        document.getElementById('success-message').textContent = '';
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    document.getElementById('error-message').textContent = 'Ocorreu um erro durante o login.';
                });
            });
        } else {
            console.error('Login Form não encontrado');
        }
        
        // Outras funções como validação e manipulação de senha
    });    
    
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
    if (characters.length > 0) {
        characters.forEach((character) => {
            character.addEventListener('click', () => {
                removeSelectedCard();
                character.classList.add('selected');
                changeMainImage(character);
                changeMainCharacterName(character);
                changeDescription(character);
            });
        });
    } else {
        console.error('Nenhum personagem encontrado');
    }

    function removeSelectedCard() {
        characters.forEach((character) => {
            character.classList.remove('selected');
        });
    }
    
    function changeMainImage(character) {
        const mainImage = document.querySelector('.selected-character .main');
        if (mainImage) {
            const characterImage = character.querySelector('img');
            mainImage.src = characterImage.src;
            mainImage.alt = characterImage.alt;
        } else {
            console.error('Imagem principal não encontrada');
        }
    }
    
    function changeMainCharacterName(character) {
        const characterName = document.getElementById('character-name');
        if (characterName) {
            characterName.textContent = character.dataset.name;
        } else {
            console.error('Nome do personagem não encontrado');
        }
    }
    
    function changeDescription(character) {
        const description = document.getElementById('description');
        if (description) {
            description.textContent = character.dataset.description;
        } else {
            console.error('Descrição não encontrada');
        }
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
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const checkIcon = document.getElementById('emailCheckIcon');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (emailInput.value.trim() !== '' && emailPattern.test(emailInput.value)) {
                if (checkIcon) checkIcon.style.display = 'block';
            } else {
                if (checkIcon) checkIcon.style.display = 'none';
            }
        });
    } else {
        console.error('Campo de e-mail não encontrado');
    }

    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const checkIcon = document.getElementById('passwordCheckIcon');
            const isValidPassword = passwordInput.value.trim().length >= 8;
    
            if (isValidPassword) {
                if (checkIcon) checkIcon.style.display = 'block';
            } else {
                if (checkIcon) checkIcon.style.display = 'none';
            }
        });
    } else {
        console.error('Campo de senha não encontrado');
    }

    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function () {
            const input = document.querySelector('#passwordInput');
            const iconImg = this.querySelector('img');
    
            this.classList.toggle('active');
    
            if (input && iconImg) {
                if (input.type === 'password') {
                    input.type = 'text';
                    iconImg.src = '/img/Estilização/Imagens/sharingan-eye.png';
                } else {
                    input.type = 'password';
                    iconImg.src = '/img/Estilização/Imagens/eye-satoru-gojo.png';
                }
            } else {
                console.error('Campo de senha ou ícone não encontrado');
            }
        });
    });

    /*------------------
        Social Connection
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