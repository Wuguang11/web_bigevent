$(function () {
  const form = layui.form;
  const layer = layui.layer;
  // 自定义密码的规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: (val) => {
      if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
    },
    rePwd: (val) => {
      if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
    },
  });
  //   发送请求验证密码
  $(".layui-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(".layui-form").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("更新密码失败！");
        layer.msg("更新密码成功！");
        // 跳转到登录界面 重置token
        localStorage.removeItem("token");
        window.parent.location.href = "/login.html";
      },
    });
  });
});
