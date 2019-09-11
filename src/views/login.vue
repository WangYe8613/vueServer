<style lang="less">
  @import './login.less';
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
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">密码是123456，输入其他密码会提示非法</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import Qs from 'qs'

  export default {
    //设置一些默认数据，供前端代码使用
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
    },
    methods: {
      //在这里写响应方法
      handleSubmit() {
        //这里就使用main.js中定义的全局变量$axios来发起http请求
        this.$axios({
          method: 'get', //请求方式
          url: '/api/checkLogin', //api对应url，要和后端设置的一致
          params: { //传参
            userName: this.form.userName,
            password: this.form.password
          }
        }).then(response => { //获取http响应数据
          //response.data对应后端服务返回的json类型数据
          //下面三个数据请和后端服务中的返回数据对比
          //具体文件：ssmServer项目version_1.1分支中ssmServer/src/main/java/com/lw/common/Response.java
          var responseCode = response.data.code; //返回错误码
          var responseData = response.data.data; //返回对象
          var responseMessage = response.data.message; //返回信息

          //下面两个if判断中的写法都行
          //if(JSON.parse(JSON.stringify(response.data))['code'] == 200){
          if (responseCode == 200) {
            //校验成功，跳转登录界面
            Cookies.set('user', this.form.userName);
            Cookies.set('password', this.form.password);
            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
            if (this.form.userName === 'iview_admin') {
              Cookies.set('access', 0);
            } else {
              Cookies.set('access', 1);
            }
            this.$router.push({
              name: 'home_index'
            });
          } else {
            //校验失败，提示用户信息有误
            this.$Message.info(responseMessage);
          }
        })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
</script>

<style>

</style>
