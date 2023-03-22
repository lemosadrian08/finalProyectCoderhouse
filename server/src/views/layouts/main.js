const socket = io();

  // Chat
  function renderChat(data) {
    const html = data.map((m) => {
        return `<div>
              <strong style='color:blue'>${m.email}</strong>:
              <em style='color:brown'>${m.createdAt}<em>
              <em style='color:green'>${m.body}</em> 
              </div>`;
      })
      .join(" ");
    document.getElementById("messages").innerHTML = html;
  }
  
  function addMessage() {
    const message = {
      email: document.getElementById("email").value,
      body: document.getElementById("text").value

    };
    socket.emit("new-message", message);
    return false;
  }
  
  socket.on("messages", function (data) {
    renderChat(data);
  });