function toggleForm(form) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const hapusAbsenBtn = document.getElementById('hapusAbsenBtn');

  if (form === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    btnLogin.classList.add('active');
    btnSignup.classList.remove('active');
    hapusAbsenBtn.style.display = 'none';
  } else {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    btnSignup.classList.add('active');
    btnLogin.classList.remove('active');
    hapusAbsenBtn.style.display = 'inline-block';
  }
}

function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!username || !password) {
    alert('Mohon isi username dan password dengan benar.');
    return;
  }
  alert(`Mencoba login dengan username: ${username}`);
}

function signUp() {
  const username = document.getElementById('signupUsername').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const role = document.getElementById('signupRole').value;

  if (!username || !password) {
    alert('Mohon isi username dan password dengan benar.');
    return;
  }
  alert(`Mendaftar user: ${username} dengan peran: ${role}`);
}

// Default tampil login
toggleForm('login');
