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
			console.log(nextForm,'nextForm')

			//Check for validation
			if(input.type ==='text' && validateUser(input)){
				nextSlide(parent, nextForm);
				document.querySelector('.error').innerHTML ='';	
				document.querySelector('.error').style.border ='none';
			}else if(input.type ==='email' && validateEmail(input)){
				nextSlide(parent, nextForm);
				document.querySelector('.error').innerHTML ='';	
				document.querySelector('.error').style.border ='none';
			}else if(input.type ==='password'&& validatePassword(input)){
				nextSlide(parent, nextForm);
				document.querySelector('.error').innerHTML ='';	
				document.querySelector('.error').style.border ='none';
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
	errorText.style.color = "white";

function validateUser(user){
	const validationName =/^[a-zA-Z ]*$/;
	if(user.value.length < 3 || validationName.test(user.value)===false){
		//console.log('not enough characters');
		errorText.innerHTML = 'Enter a valid name!';
		errorText.style.border = "2px solid white";
		error('rgb(189,87,87)');
	}else {
		error('rgb(87,189,130)');
		return true;
	}
}

function validateEmail(email){
	const validationEmail =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(validationEmail.test(email.value)){
		error('rgb(87,189,130)');
		return true;
	}else{
		errorText.innerHTML = 'Enter a valid email!';
		errorText.style.border = "2px solid white";
		error('rgb(189,87,87)');
	}
}

function validatePassword (password){
	const validationPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
	const Error1 =/(?=.*[a-z])/;
	const Error2 =/(?=.*[A-Z])/;
	const Error3 =/(?=.*[0-9])/;
	const Error4 =/(?=.*[!@#\$%\^&\*])/;
	const Error5 =/(?=.{8,})/;

	if(validationPassword.test(password.value)){
		error('rgb(87,189,130)');
		return true;
	}else if (Error1.test(password.value) === false || 
			  Error2.test(password.value) === false ||
			  Error3.test(password.value) === false){
		errorText.innerHTML = 'Your password is too simple.The password must contain at least 1 lowercase, uppercase and numeric alphabetical character.';
		errorText.style.border = "2px solid white";
		error('rgb(189,87,87)');
	}else if (Error4.test(password.value)){
		errorText.innerHTML = 'Change your password.The string must contain at least one special character (!, @, #, $, %, ^, &, *).';
		errorText.style.border = "2px solid white";
		error('rgb(189,87,87)');
	}else if (Error5.test(password.value) === false){
		errorText.innerHTML = 'Change your password.The string must be eight characters or longer!';
		errorText.style.border = "2px solid white";
		error('rgb(189,87,87)');
	}
}

function error(color){
	document.body.style.backgroundColor = color;
}

animatedForm();