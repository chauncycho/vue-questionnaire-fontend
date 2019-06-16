<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
  import Header from '@/components/commons/Header'

  export default {
    name: 'App',
    components: {Header},

    mounted () {
      this.$axios.interceptors.response.use(response=>{//420拦截
        return response
      },error => {
        // console.error(error.response);
        if (error.response.status === 420){
          this.$message.error('请先登录');
          this.$router.push("/login")
        }
        return error;
      })
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
    /*color: #909399;*/
  }

  #app {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
</style>
