<template>
    <div>
        <h1>Signup</h1>
        <form @submit.prevent="submitForm">
            <label for="username">Username:</label>
            <input type="text" v-model="username" required />
  
            <label for="email">Email:</label>
            <input type="email" v-model="email" required />
  
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
  
            <button type="submit">Sign Up</button>
  
            <p>Already have an account? <router-link to="/login">Login</router-link></p>

            
            <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Signup",
    data() {
        return {
            username: "",
            email: "",
            password: "",
            errorMessage: "" 
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post("http://localhost:3000/signup", {
                    username: this.username,
                    email: this.email,
                    password: this.password
                });

                console.log("Response:", response.data);
                this.errorMessage = "";
                alert("Signup Successful!");
                this.$router.push("/dashbord");

            } catch (error) {
                console.error("Signup Error:", error.response?.data);
                this.errorMessage = error.response?.data?.message || "Something went wrong!";
            }
        }
    }
};
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}
form {
    border: 1px solid black;
    padding: 20px;
    margin: 20px;
    width: 250px;
    display: flex;
    flex-direction: column;
}
label, input, button {
    margin-bottom: 20px;
}
</style>
