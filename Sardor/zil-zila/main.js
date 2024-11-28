const elBtn =  document.getElementById('shakeScreen')
elBtn.addEventListener('click', () => {
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 1000); 
});
