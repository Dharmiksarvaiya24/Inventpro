<template>
    <div>
        <h1>Welcome, {{ userName }}!</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: "Dharmik" 
        };
    }
};
</script>

<style scoped>
h1 {
    color: #333;
}
</style>