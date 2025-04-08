<template>
  <div class="user-card">
    <h3>{{ user.username }}</h3>
    <div>
      <button class="button" @click="deleteUser">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    user: Object
  },
  methods: {
    async deleteUser() {
  try {
    await axios.post('http://localhost:3000/deleteuser', { id: this.user._id });
    this.$emit('user-deleted', this.user._id); // <-- Emit here
    alert('User deleted successfully!');
    window.location.reload();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
  }
};
</script>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  margin: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
