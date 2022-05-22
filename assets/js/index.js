$(function () {
  // 开始立即调用获取用户信息
  getUserinfo();
  const layer = layui.layer;
  $("#btnlogout").click(() => {
    layui.layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "" },
      function (index) {
        // 清空本地存储里面的 token
        localStorage.removeItem("token");
        // 重新跳转到登录页面
        location.href = "/login.html";
      }
    );
  });
  function getUserinfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      //请求头 获取token 验证用户信息
      // headers: {
      //   Authorization: localStorage.getItem("token"),
      // },
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg("获取数据失败");
        layer.msg("获取数据成功");
        renderAvater(res.data);
      },
    });
  }
  const renderAvater = (user) => {
    // 获取用户的名字
    let name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`);
    // 渲染头像图片
    if (user.user_pic !== null) {
      $(".layui-nav-img").attr("src", user.user_pic).show();
      $(".text-avatar").hide();
    } else {
      $(".layui-nav-img").hide();
      let fiestName = name[0].toUpperCase();
      $(".text-avatar").html(fiestName);
    }
  };
  function change() {
    $("#art_list").addClass("layui-this").next().removeClass("layui-this");
  }
});
