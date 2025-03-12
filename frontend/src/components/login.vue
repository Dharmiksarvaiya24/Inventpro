<!-- it contains login page related code-->
<template>
    <div>
        <h1>Login</h1>
        <form>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Login</button>

        </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "login",
  };
  </script>
  <style scoped>
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
  }
   form{
    border: 1px solid black;
    padding: 20px;
    margin: 20px;
    width: 250px;
    display: flex;
    flex-direction: column;
   }
   label, input, button {
    margin-bottom: 10px;
}
  </style>
 
  