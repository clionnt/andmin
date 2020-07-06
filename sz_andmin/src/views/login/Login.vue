<template>
    <div class="login">
        <div class="login_box">
            <div class="xmao"><img src="~assets/img/xmao.png"></div>
            <el-form :rules="rules" :model="login_form" ref="LoginForm" @keyup.enter.native="SubmitClick">
                <el-form-item prop="username">
                    <el-input  prefix-icon="iconfont icon-user" v-model="login_form.username" v-focus></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input  prefix-icon="iconfont icon-3702mima" v-model="login_form.password" type="password" ></el-input>
                </el-form-item>
                <el-form-item class="login_btns">
                    <el-button type="primary" plain @click="SubmitClick">登录</el-button>
                    <el-button type="info" plain @click="ResetClick">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {reqLogin} from "network/api.js"
export default {
    name:"Login",
    data(){
        return {
            //表单失去焦点验证规则
            rules:{
                username: [
                    { required: true, message: '火速输入账号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '火速输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            },
            //表单数据绑定
            login_form:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        //点击重置界面
        ResetClick(){
            this.$refs.LoginForm.resetFields()
        },
        //点击登录界面
        SubmitClick(){
            this.$refs.LoginForm.validate(async valid => {
                if(!valid){
                    return
                }
                //发送登录请求
                const result = await reqLogin(this.login_form)
                console.log(result);
                const {status,msg} = result.meta
                if(status !==200){
                    //登录失败
                    return this.$message({
                        showClose: true,
                        message: msg,
                        type: 'error',
                        duration:600
                    });
                }
                //登录成功
                //首先保存账号密码
                const {token} = result.data
                sessionStorage.setItem("token",token)
                //跳转页面
                this.$router.replace("/home")
            })
            
            
        },
        
    },
    directives: {
        //自动获取input焦点
        focus: {
            // 指令的定义
            inserted: function (el) {
            el.querySelector('input').focus()
            }
        }
    }
};
</script>

<style scoped lang="less">
.login{
    background: rgb(10, 10, 10);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login_box{
        height: 300px;
        width: 450px;
        background: white;
        border-radius: 15px;
        position: relative;
        box-shadow: 0 0 10px white;
        .xmao{
            width: 150px;
            height: 150px;
            background-color: rgb(221, 216, 216);
            border-radius: 50%;
            box-shadow: 0 0 15px white;
            padding: 13px;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .el-form{
            position: absolute;
            bottom: -15px;
            left: 0;
            right: 0;
            padding: 20px;
            .login_btns{
                text-align: right;
            }
        }
    }
}
</style>
