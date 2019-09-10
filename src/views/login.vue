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
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import Qs from 'qs'

  export default {
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
      handleSubmit() {
        var data = Qs.stringify({"userName":"1","password":"2"});
        this.$axios({
          method:'get',
          url:'/api/checkLogin',
          params:{
            userName:this.form.userName,
            password:this.form.password
          }
        }).then(response => {
          var responseCode=response.data.code;
          var responseData=response.data.data;
          var responseMessage=response.data.message;
          //下面两个if判断中的写法都行
          //if(JSON.parse(JSON.stringify(responseResult))['data'] == "b"){
          if(responseCode == 200){
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
          }else {
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
