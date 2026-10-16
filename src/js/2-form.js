const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formState = {
  email: '',
  message: '',
};

function populateForm() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      formState.email = parsedData.email ?? '';
      formState.message = parsedData.message ?? '';
      
      form.elements.email.value = formState.email;
      form.elements.message.value = formState.message;
    }
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
}

populateForm();

form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  
  formState[name] = value.trim();
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if (!formState.email || !formState.message) {
    alert('Fill please all fields');
    return;
  }
  
  console.log({
    email: formState.email,
    message: formState.message
  });
  
  localStorage.removeItem(STORAGE_KEY);
  
  formState.email = '';
  formState.message = '';
  
  form.reset();
});