const CLIENT_ID = 'a5b0f45ae12f4d74a6ee4dae882b9779';
const CLIENT_SECRET = '83b21fd2a6304fde9df87bb18373d51e';

document.getElementById('search-button').addEventListener('click', function() {
    var searchTerm = document.getElementById('search-input').value;
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    })
    .then(response => response.json())
    .then(data => {
        var token = data.access_token;
        fetch('https://api.spotify.com/v1/search?q=' + searchTerm + '&type=track', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            var results = document.getElementById('results');
            results.innerHTML = '';
            data.tracks.items.slice(0, 5).forEach(track => {
                var trackDiv = document.createElement('div');
                trackDiv.innerHTML = '<strong>' + track.name + '</strong> by ' + track.artists[0].name;
                results.appendChild(trackDiv);
            });
            
        });
    });
});

// İLETİŞİM FORMU
 
function clearForm() {
    document.getElementById("contactForm").reset();
}

function checkForm(firstName, lastName, email, mobile, message) {
    // Değerlerin boş olup olmadığını kontrol et
    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || mobile.trim() === '' || message.trim() === '') {
        alert('Lütfen tüm alanları doldurunuz.');
        return false;
    }

    // Email formatını kontrol et
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Lütfen geçerli bir email adresi giriniz.');
        return false;
    }

    // Telefon numarasının formatını kontrol et
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(mobile)) {
        alert('Lütfen geçerli bir telefon numarası giriniz (örn: 5551234567).');
        return false;
    }
    return true;
}

function submitForm(event) {
    event.preventDefault(); // Formun varsayılan gönderme işlemini engelle
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const message = document.getElementById("message").value;

    const check = checkForm(firstName, lastName, email, mobile, message);
    if (check) {
        document.getElementById("contactForm").submit();
    }
}


// Giriş 


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    // Check if email is empty or not a valid email address
    if (email.trim() === "" || !validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    // Check if password is empty
    if (password.trim() === "") {
        alert("Please enter your password.");
        return;
    }
    
    // Submit form data to PHP page for validation
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    
    fetch("giris.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === "success") {
            alert("Welcome " + email);
            window.location.replace("success.html"); // Redirect to success page
        } else {
            alert("Login failed. Please check your credentials.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
