<template>
  <div class="video-container">
    <video autoplay muted loop playsinline class="background-video">
      <source src="../assets/main_back.mp4" type="video/mp4" />
    </video>
    <div class="overlay"></div>
  </div>

  <div class="navbar">
    <div class="navbar-left">
      <h2 class="dashboard-heading">Welcome to Pointz</h2>
    </div>
    <div class="navbar-right">
      <div class="user-section">
        <div class="history">
          <img src="../assets/history.png" alt="History" style="width: 20px; height: 20px;" />
        </div>
        <img src="../assets/user.png" alt="User" class="user-avatar" onclick="showfunctions" />
        <span class="welcome-label">{{ userName }}</span>
      </div>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </div>

  <div class="main-section">
    <div class="user-container">
      <h2 class="user-list-heading">Participations</h2>
      <button @click="showModal = true" class="add-user-btn">Add User</button>
      <div class="user-cards">
        <UserCard
          v-for="user in users"
          :key="user._id"
          :user="user"
          @user-updated="updateUser"
        />
      </div>

      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showModal = false">&times;</span>
          <h2>Add New User</h2>
          <input type="text" v-model="newuser" placeholder="Enter username" />
          <button @click="saveUser">Save</button>
        </div>
      </div>
    </div>

    <div class="user-container">
      <h2 class="user-list-heading">Rewards</h2>
      <button @click="showRewardModal = true" class="add-user-btn">Add Reward</button>

      <div class="user-cards">
        <div v-for="(reward, index) in rewards" :key="index" class="reward-card">
          {{ reward }}
        </div>
      </div>

      <div v-if="showRewardModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showRewardModal = false">&times;</span>
          <h2>Add New Reward</h2>
          <input type="text" v-model="newReward" placeholder="Enter reward name" />
          <button @click="saveReward">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserCard from "./usercard.vue";

export default {
  components: { UserCard },
  data() {
    return {
      userName: this.$route.params.username || "Guest",
      showModal: false,
      newuser: "",
      users: [],
      showRewardModal: false,
      newReward: "",
      rewards: []
    };
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/users");
        this.users = response.data;
      } catch (error) {
        alert("Failed to fetch users. Please try again.");
      }
    },
    async saveUser() {
      if (!this.newuser.trim()) {
        alert("Username cannot be empty.");
        return;
      }
      try {
        await axios.post("http://localhost:3000/newuser", { username: this.newuser });
        this.newuser = "";
        this.showModal = false;
        await this.fetchUsers();
        alert("User added successfully!");
      } catch (error) {
        alert("Failed to add user. Please try again.");
      }
    },
    saveReward() {
      if (!this.newReward.trim()) {
        alert("Reward cannot be empty.");
        return;
      }
      this.rewards.push(this.newReward.trim());
      this.newReward = "";
      this.showRewardModal = false;
      alert("Reward added successfully!");
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex(u => u._id === updatedUser._id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px) brightness(0.8);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.45));
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  margin: 1.5rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
}

.dashboard-heading {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.navbar-right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.history {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.history:hover {
  transform: scale(1.1);
}

.history-icon {
  width: 20px;
  height: 20px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.welcome-label {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
}

.logout-btn {
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  border: none;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.main-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}

.user-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  color: white;
  flex: 1 1 350px;
}

.user-list-heading {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #a1c4fd, #c2e9fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.add-user-btn {
  background: linear-gradient(90deg, #f093fb, #f5576c);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  margin: 0 auto 1.5rem auto;
}

.add-user-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.user-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.reward-card {
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem 1.5rem;
  border-radius: 15px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  font-weight: 500;
  min-width: 150px;
  text-align: center;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  background: rgba(0, 0, 0, 0.15);
  padding: 2rem;
  border-radius: 20px;
  width: 300px;
  color: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  position: relative;
}

.modal-content input {
  padding: 0.6rem;
  margin-top: 1rem;
  border: none;
  border-radius: 10px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
}

.modal-content button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(90deg, #43e97b, #38f9d7);
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.modal-content button:hover {
  transform: scale(1.05);
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}
</style>
