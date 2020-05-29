<style lang="less">
  @import './login';
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="signIn" type="primary" long>登录</Button>
              <Button @click="signOut" type="primary" long>注册</Button>
            </FormItem>
          </Form>
          <p class="login-tip">密码是123456，输入其他密码会提示非法</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>

  export default {
    //设置一些默认数据，供前端代码使用
    methods: {
      //在这里写响应方法
      signIn() {
        var axios = require('axios')
        axios.defaults.baseURL = "http://localhost:8080/"

        axios({
          method: 'get', //请求方式
          url: '/identity/signIn', //api对应url，要和后端设置的一致
          params: { //传参
            userName: this.form.userName,
            password: this.form.password
          }
        }).then(response => { //获取http响应数据
          //response.data对应后端服务返回的json类型数据
          //下面三个数据请和后端服务中的返回数据对比
          //具体文件：ssmServer项目version_1.1分支中ssmServer/src/main/java/com/lw/common/Response.java
          var responseInventory = response.data.inventory; //返回错误码
          var responseCode = response.data.code; //返回对象
          var responseMessage = response.data.message; //返回信息
          var token = null;
          if(responseInventory!==null){
            token = responseInventory.token;
          }
          document.cookie="authToken="+token;
          if (token != null) {
            //校验成功，跳转主页
            this.$router.push({
              name: 'postBar',
            });
          } else {
            //校验失败，提示用户信息有误
            this.$Message.info(responseMessage);
          }
        }).catch(error => {
            this.$Message.info("SSO服务无响应！！！");
            console.log(error);
          });
      },
      signOut() {
        var axios = require('axios')
        axios.defaults.baseURL = "http://localhost:8080/"

        axios({
          method: 'get', //请求方式
          url: '/identity/signOut', //api对应url，要和后端设置的一致
          params: { //传参
            userName: this.form.userName,
            password: this.form.password
          }
        }).then(response => { //获取http响应数据
          //response.data对应后端服务返回的json类型数据
          //下面三个数据请和后端服务中的返回数据对比
          //具体文件：ssmServer项目version_1.1分支中ssmServer/src/main/java/com/lw/common/Response.java
          var responseInventory = response.data.inventory; //返回错误码
          var responseCode = response.data.code; //返回对象
          var responseMessage = response.data.message; //返回信息
          if(responseInventory!==null){
            //注册成功，跳转登录
            //校验失败，提示用户信息有误
            this.$Message.info("注册成功！！请登录");
            this.$router.push({
              name: 'login',
            });
          } else {
            //校验失败，提示用户信息有误
            this.$Message.info(responseMessage);
          }
        }).catch(error => {
          this.$Message.info("SSO服务无响应！！！");
          console.log(error);
        });
      }
    },
    data() {
      return {
        form: {
          userName: 'admin',
          password: ''
        },
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    }
  };
</script>
