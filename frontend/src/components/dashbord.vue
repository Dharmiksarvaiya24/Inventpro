<template>
    <div class="nav">
      <h1>Welcome {{ userName }}</h1>
    </div>
  
    <div class="add">
      <button class="add" @click="showModal = true">Add User</button>
    </div>
  
    <div class="logout">
      <button @click="logout">Logout</button>
    </div>
  
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h2>Add New User</h2>
        <input v-model="newuser" type="text" placeholder="Enter username" required />
        <div class="modal-buttons">
          <button @click="saveUser">Save</button>
          <button @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>
  
    <div class="user-list">
      <UserCard v-for="user in users" :key="user._id" :user="user" />
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import UserCard from "./usercard.vue"; // ✅ Import UserCard
  
  export default {
    components: { UserCard },
    data() {
      return {
        userName: this.$route.params.username || "Guest",
        showModal: false,
        newuser: "",
        users: [] // ✅ Store fetched users
      };
    },
    methods: {
      logout() {
        this.$router.push("/login");
      },
      async fetchUsers() {
        try {
          const response = await axios.get("http://localhost:3000/users");
          this.users = response.data; // ✅ Store users in state
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
      async saveUser() {
        try {
          console.log("Sending data:", this.newuser);
  
          await axios.post("http://localhost:3000/newuser", {
            username: this.newuser
          });
  
          console.log("User saved successfully!");
  
          this.newuser = "";
          this.showModal = false;
  
          await this.fetchUsers(); // ✅ Refresh user list without page reload
  
        } catch (error) {
          console.error("Error saving user:", error.response ? error.response.data : error);
        }
      }
    },
    mounted() {
      this.fetchUsers(); // ✅ Fetch users on page load
    }
  };
  </script>
  
  <style scoped>
  .logout {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 5px;
    border-radius: 5px;
    width: 230px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  .modal-buttons {
    margin-top: 15px;
  }
  .modal-buttons button {
    padding: 8px 12px;
    margin: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  .user-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }
  </style>
  