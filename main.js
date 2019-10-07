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
				NextSlide();
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

const validationName = /^[a-zA-Z ]*$/,
      validationEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      validationPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      PasswordError1 =/(?=.*[a-z])/,
      PasswordError2 =/(?=.*[A-Z])/,
      PasswordError3 =/(?=.*[0-9])/,
      PasswordError4 =/(?=.*[!@#\$%\^&\*])/,
      PasswordError5 =/(?=.{8,})/;
	  
const errorText = document.querySelector('.error');	

function errorTextStyle(){
	errorText.style.color = "white";
	errorText.style.border = "2px solid white";
	error('rgb(189,87,87)');
} 

function correctFillingStyle(){
	error('rgb(87,189,130)');
       // return true;
} 

function validateUser(user){
	if(user.value.length < 3 || validationName.test(user.value)===false){
		errorTextStyle();
		errorText.innerHTML = 'Enter a valid name!';
	}else {
		correctFillingStyle();
		return true;
	}
}

function validateEmail(email){
	if(validationEmail.test(email.value)){
		correctFillingStyle();
		return true;
	}else{
		errorText.innerHTML = 'Enter a valid email!';
		errorTextStyle();
	}
}

function validatePassword (password){
	if(validationPassword.test(password.value)){
		correctFillingStyle();
		return true;
	}else if (PasswordError1.test(password.value) === false || 
			  PasswordError2.test(password.value) === false ||
			  PasswordError3.test(password.value) === false){
		errorText.innerHTML = 'Your password is too simple.The password must contain at least 1 lowercase, uppercase and numeric alphabetical character.';
		errorTextStyle();
	}else if (PasswordError4.test(password.value)){
		errorText.innerHTML = 'Change your password.The string must contain at least one special character (!, @, #, $, %, ^, &, *).';
		errorTextStyle();
	}else if (PasswordError5.test(password.value) === false){
		errorText.innerHTML = 'Change your password.The string must be eight characters or longer!';
		errorTextStyle();
	}
}

function error(color){
	document.body.style.backgroundColor = color;
}

animatedForm();
