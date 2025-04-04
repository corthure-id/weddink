// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// Realtime Database Reference
const chatRef = firebase.database().ref("chats");

// Mengirim Pesan
const sendMessage = () => {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (name && message) {
        chatRef.push({
            name: name,
            message: message
        });
        document.getElementById("message").value = ""; // Reset input
    }
};

// Mendapatkan Pesan secara Real-Time
chatRef.on("child_added", (snapshot) => {
    const chat = snapshot.val();
    const chatContainer = document.getElementById("chat-container");

    const newMessage = document.createElement("div");
    newMessage.classList.add("chat-bubble");
    newMessage.innerHTML = `<strong>${chat.name}:</strong> ${chat.message}`;
    chatContainer.appendChild(newMessage);

    // Scroll otomatis ke bawah
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
