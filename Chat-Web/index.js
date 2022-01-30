import WebIM from "easemob-websdk";
var username, password;
WebIM.conn = new WebIM.connection({
  appKey: "easemob-demo#easeim"
});

// 添加回调函数
WebIM.conn.addEventHandler("connection&message", {
  onConnected: () => {
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append("Connect success !");
  },
  onDisconnected: () => {
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append("Logout success !");
  },
  onTextMessage: (message) => {
    console.log(message);
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append("Message from: " + message.from + " Message: " + message.msg);
  },
  onError: (error) => {
    console.log("on error", error);
  }
});

// 按钮行为定义
window.onload = function () {
  // 注册
  document.getElementById("register").onclick = function () {
    username = document.getElementById("userID").value.toString();
    password = document.getElementById("password").value.toString();

    WebIM.conn
      .registerUser({ username, password })
      .then((res) => {
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append(`register user ${username} success`);
      })
      .catch((e) => {
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append(`${username} already exists`);
      });
  };
  // 登录
  document.getElementById("login").onclick = function () {
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append("Logging in...");
    username = document.getElementById("userID").value.toString();
    password = document.getElementById("password").value.toString();

    // 使用用户名密码的方式
    WebIM.conn
      .open({ user: username, pwd: password })
      .then((res) => {
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append(`Login Success`);
      })
      .catch((e) => {
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append(`Login failed`);
      });
  };

  // 登出
  document.getElementById("logout").onclick = function () {
    WebIM.conn.close();
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append("logout");
  };

  // 发送一条单聊消息
  document.getElementById("send_peer_message").onclick = function () {
    let peerId = document.getElementById("peerId").value.toString();
    let peerMessage = document.getElementById("peerMessage").value.toString();
    let option = {
      chatType: "singleChat", // 设置为单聊
      type: "txt",            // 消息类型
      to: peerId,             // 接收消息对象（用户 ID)
      msg: peerMessage        // 消息
    };
    let msg = WebIM.message.create(option);
    WebIM.conn
      .send(msg)
      .then((res) => {
        console.log("send private text success");
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append("Message send to: " + peerId + " Message: " + peerMessage);
      })
      .catch((err) => {
        console.log("send private text fail", err);
      });
  };
};
