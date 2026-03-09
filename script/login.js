// console.log('login page connected')
document.getElementById('loginBtn').addEventListener('click', function(e){
    e.preventDefault()
    

    const userName = document.getElementById('userName').value;
    const userPassword = document.getElementById('userPassword').value

    userName === 'admin'? 
        (userPassword ==='admin123'? 
            (window.location.href = `./home.html`): alert('please enter valid user password'))
    :alert('please enter valid user name')

    // if(userName === 'admin' && userPassword === 'admin123'){
    //     window.location.href = './index.html'
    // }
})