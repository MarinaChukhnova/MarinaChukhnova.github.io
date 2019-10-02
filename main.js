function nextSlide(parent,nextForm){
	parent.classList.add('innactive');
	parent.classList.remove('active');
	nextForm.classList.add('active');
	//nextForm.classList.add('innactive');
}

function animatedForm() {
	const arrows = document.querySelectorAll('.fa-arrow-right');	

	arrows.forEach(arrow =>{
		arrow.addEventListener('click', () =>{
			const input = arrow.previousElementSibling;
			const parent = arrow.parentElement;
			const nextForm = parent.nextElementSibling;

			console.log(input, 'input');
			console.log(parent,'parent');
			console.log(nextForm,'nextForm');

			function NextSlide(){
				nextSlide(parent, nextForm);
				document.querySelector('.error').innerHTML ='';	
				document.querySelector('.error').style.border ='none';
			}

			//Check for validation
			if(input.type ==='text' && validateUser(input)){
				NextSlide();s
			}else if(input.type ==='email' && validateEmail(input)){
				NextSlide();
			}else if(input.type ==='password'&& validatePassword(input)){
				NextSlide();
			}else{
				parent.style.animation ='shake 0.5s ease';
			}
			//get rid of animation
			parent.addEventListener('animationend',() => {
				parent.style.animation ='';
			});
		});	
	});
}

const errorText = document.querySelector('.error');

const validationName = /^[a-zA-Z ]*$/,
      validationEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      validationPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      PasswordError1 =/(?=.*[a-z])/,
	  PasswordError2 =/(?=.*[A-Z])/,
	  PasswordError3 =/(?=.*[0-9])/,
	  PasswordError4 =/(?=.*[!@#\$%\^&\*])/,
	  PasswordError5 =/(?=.{8,})/;
	  
	
function errorTextStyle(){
	errorText.style.color = "white";
	errorText.style.border = "2px solid white";
} 

function validateUser(user){
	if(user.value.length < 3 || validationName.test(user.value)===false){
		//console.log('not enough characters');
		errorTextStyle();
		errorText.innerHTML = 'Enter a valid name!';
		error('rgb(189,87,87)');
	}else {
		error('rgb(87,189,130)');
		return true;
	}
}

function validateEmail(email){
	if(validationEmail.test(email.value)){
		error('rgb(87,189,130)');
		return true;
	}else{
		errorText.innerHTML = 'Enter a valid email!';
		errorTextStyle();
		error('rgb(189,87,87)');
	}
}

function validatePassword (password){
	if(validationPassword.test(password.value)){
		error('rgb(87,189,130)');
		return true;
	}else if (PasswordError1.test(password.value) === false || 
			  PasswordError2.test(password.value) === false ||
			  PasswordError3.test(password.value) === false){
		errorText.innerHTML = 'Your password is too simple.The password must contain at least 1 lowercase, uppercase and numeric alphabetical character.';
		errorTextStyle();
		error('rgb(189,87,87)');
	}else if (PasswordError4.test(password.value)){
		errorText.innerHTML = 'Change your password.The string must contain at least one special character (!, @, #, $, %, ^, &, *).';
		errorTextStyle();
		error('rgb(189,87,87)');
	}else if (PasswordError5.test(password.value) === false){
		errorText.innerHTML = 'Change your password.The string must be eight characters or longer!';
		errorTextStyle();
		error('rgb(189,87,87)');
	}
}

function error(color){
	document.body.style.backgroundColor = color;
}

animatedForm();