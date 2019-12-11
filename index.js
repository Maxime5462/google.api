const apiKey = "AIzaSyB393-bQ9P6CYoblmAOuzs3kaTyt3Ir9QY"
const clientId = "722681188597-aucdg9ip8p7d34ag5dee03aurrdvti4q.apps.googleusercontent.com"

const displayUser = document.getElementById('user')
const displayName = document.getElementById('name')
const btnLogin = document.getElementById('login')
const btnLogout = document.getElementById('logout')

let auth
let user

function initGAuth () {
  console.log('init')
  auth = gapi.auth2.getAuthInstance()
  auth.isSignedIn.listen(sigin)
  sigin()
}

function sigin () {
  const isSignedIn = auth.isSignedIn.get()
  if (isSignedIn) {
    user = auth.currentUser.get()
    displayUser.style.display = 'block'
    displayName.textContent = user.getBasicProfile().getName()
    btnLogin.style.display = 'none'
    btnLogout.style.display = 'block'
  } else {
    user = null
    displayUser.style.display = 'none'
    btnLogin.style.display = 'block'
    btnLogout.style.display = 'none'
  }
  console.log(user)
}

function loginGoogle () {
  auth.signIn()
}

function logoutGoogle () {
  auth.signOut();
}

if (typeof gapi === 'object' && gapi.load) {
  gapi.load('client', () => {
    gapi.client.init({
      apiKey: apiKey,
      clientId: clientId,
      scope: 'profile',
    }).
    then(initGAuth)
  })
}
