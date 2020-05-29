<style lang="less">
  @import './postBar';
</style>

<template v-if="flag">
  <div class="postBar" @keydown.enter="handleSubmit">
    <div class="postBar-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="postBarForm" :model="form" :rules="rules">
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
          <p class="postBar-tip">密码是123456，输入其他密码会提示非法</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>

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
        },
        flag:false
      };
    },
    created(){
      this.authorizationValidate()
    },
    methods: {
      authorizationValidate(){
        var axios = require('axios')
        axios.defaults.baseURL = "http://localhost:8080/"

        var token = "";
        var cookieArrary = document.cookie.split('; '); //切割
        for(var i = 0; i < cookieArrary.length; i++){
          var cookie = cookieArrary[i].split('='); //再次切割
          if(cookie[0] == "authToken"){
            token = cookie[1];
            break;
          }
        }

        if(token == ""){
          this.$router.push({
            name: 'login',
          });
        } else {
          axios({
            method: 'get', //请求方式
            url: '/authorization/validate', //api对应url，要和后端设置的一致
            params: { //传参
              authToken: token
            }
          }).then(response => { //获取http响应数据
            var responseInventory = response.data.inventory; //返回错误码
            var responseSuccess = response.data.code; //返回对象
            var responseMessage = response.data.message; //返回信息

            if (responseInventory == null || responseInventory.validate == false) {
              this.$router.push({
                name: 'login',
              });
            } else {
              flag = true;
            }
          }).catch(error => {
            console.log(error);
          });
        }
      }
    }
  };
</script>
