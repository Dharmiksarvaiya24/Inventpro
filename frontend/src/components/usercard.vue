<template>
  <div class="user-card">
    <div class="user-info">
      <h3 class="username">{{ user.username }}</h3>
      <div class="point">
        <span class="diamond">💎</span> {{ user.points || '00' }}
      </div>
    </div>

    <div class="actions">
      <button class="button button-secondary" @click="openEditPointModal">✏️</button>
      <button class="button button-danger" @click="confirmDelete">🗑️</button>
    </div>

    <div v-if="showConfirmation" class="modal-backdrop" @click="showConfirmation = false">
      <div class="modal-content" @click.stop>
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete <strong>{{ user.username }}</strong>?</p>
        <div class="modal-actions">
          <button class="button button-secondary" @click="showConfirmation = false">Cancel</button>
          <button class="button button-danger" @click="deleteUser">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="editpoint" class="modal-backdrop" @click="editpoint = false">
      <div class="modal-content" @click.stop>
        <h4>Edit Points</h4>
        <input type="number" v-model.number="pointChange" placeholder="Enter points" class="input" />
        <textarea v-model="description" placeholder="Enter description" class="textarea"></textarea>
        <div class="modal-actions">
          <button class="button button-secondary" @click="editpoint = false">Cancel</button>
          <button class="button button-primary" @click="submitPoints">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showConfirmation: false,
      editpoint: false,
      pointChange: 0,
      description: ''
    };
  },
  methods: {
    confirmDelete() {
      this.showConfirmation = true;
    },
    async deleteUser() {
      try {
        await axios.post('http://localhost:3000/deleteuser', { id: this.user._id });
        this.$emit('user-deleted', this.user._id);
        this.showConfirmation = false;
        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    openEditPointModal() {
      this.editpoint = true;
    },
    async submitPoints() {
      try {
        await axios.post('http://localhost:3000/updatepoint', {
          id: this.user._id,
          points: this.pointChange,
          description: this.description
        });
        this.user.points = this.pointChange;
        this.user.pointDescription = this.description;
        this.editpoint = false;
        this.pointChange = 0;
        this.description = '';
      } catch (error) {
        console.error('Error updating points:', error);
      }
    }
  }
};
</script>

<style scoped>
.user-card {
  background: linear-gradient(135deg, rgba(25, 25, 35, 0.9), rgba(40, 40, 60, 0.8));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.25rem;
  margin: 1rem 0;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4), 0 0 15px rgba(160, 26, 151, 0.2);
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.username {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.point {
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  border: 1px solid rgba(203, 80, 181, 0.3);
  box-shadow: 0 0 15px rgba(230, 56, 249, 0.15);
  transition: all 0.3s ease;
}

.point-desc {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;
}

.diamond {
  color: #1d4ed8;
  filter: drop-shadow(0 0 3px rgba(56, 249, 215, 0.5));
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
}

.button {
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.button-primary {
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  color: white;
}

.button-primary:hover {
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  box-shadow: 0 0 10px rgba(255, 110, 196, 0.4), 0 0 10px rgba(120, 115, 245, 0.4);
}

.button-secondary {
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  color: rgba(255, 255, 255, 0.95);
}

.button-secondary:hover {
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  box-shadow: 0 0 10px rgba(255, 110, 196, 0.4), 0 0 10px rgba(120, 115, 245, 0.4);
}

.button-danger {
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  color: white;
}

.button-danger:hover {
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  box-shadow: 0 0 10px rgba(255, 110, 196, 0.4), 0 0 10px rgba(120, 115, 245, 0.4);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, rgba(30, 30, 40, 0.95), rgba(20, 20, 30, 0.95));
  padding: 1.5rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 90%;
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-content h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #ff6ec4, #7873f5);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.input,
.textarea {
  width: 90%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: #ff6ec4;
  background: rgba(255, 255, 255, 0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.modal-actions .button {
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
}

@media (max-width: 640px) {
  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .actions {
    margin-top: 1rem;
    justify-content: flex-end;
  }

  .button {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
  }
}
</style>
