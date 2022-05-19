$(function () {
  // 实现切换效果
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 从 LayUI 中获取 form 对象
  const form = layui.form;

  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: (val) => {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      const pwd = $(".reg-box [name=password").val();
      if (pwd !== val) return "两次密码不一致";
    },
  });
  // 获取layui 弹窗
  const layer = layui.layer;
  // 设置请求的根路径
//   const baseUrl = "http://www.liulongbin.top:3007";
  //监听注册列表，发送注册请求
  $("#form_reg").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url:  "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("注册成功");
        // 注册成功后跳转到登陆界面
        $("#link_login").click();
      },
    });
  });
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $("#form_login").serialize(),
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg("登陆失败");
        layer.msg("登录成功");
        // 将获取到的token储存到本地
        localStorage.setItem("token", res.token);
        //跳转到本地
        location.href = "/index.html";
      },
    });
  });
});
