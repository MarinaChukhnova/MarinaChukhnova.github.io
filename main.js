function nextSlide(parent,nextForm){
	parent.classList.add('innactive');
	parent.classList.remove('active');
	nextForm.classList.add('active');
	nextForm.classList.add('innactive');
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
			}else if(input.type ==='email' && validateEmail(input)){
				nextSlide(parent, nextForm);
			}else if(input.type ==='password'&& validateUser (input)){
				nextSlide(parent, nextForm);
			}else{
				parent.style.animation ='shake 0.5s ease ';
			}
			//get rid of animation
			parent.addEventListener('animationend',()=>{
				parent.style.animation ='';
			});
		});	
	});
}

function validateUser(user){
	const validationName =/^[a-zA-Z]*$/;
	if(user.value.length < 6 || validationName.test(user.value)===false){
		console.log('not enough characters');
		error('rgb(189,87,87)');
	}else {
		error('rgb(187,189,130)');
		return true;
	}
}
function validateEmail(email){
	const validation =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(validation.test(email.value)){
		error('rgb(187,189,130)');
		return true;
	}else{
		error('rgb(189,87,87)');
	}
}


function error(color){
	document.body.style.backgroundColor = color;
}

animatedForm();
