const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const formValidation = (state: any) => {
    const { name, username, email, password } = state

    let isValidated;
    let toastMessage;

    if(name === ''){
        return{
          isValidated: false,
          toastMessage: 'Please fill the name field.'
        }
    }
    else if(username === ''){
        return{
          isValidated: false,
          toastMessage: 'Please fill the username field.'
        }
    }
    else if(!validateEmail(email)){
        return{
          isValidated: false,
          toastMessage: 'Please provide a valid email.'
        }
    }
    else if(password === ''){
        return{
          isValidated: false,
          toastMessage: 'Please fill the password field.'
        }
    }
    else{
        return {
            isValidated: true
        }
    }
}

export default formValidation