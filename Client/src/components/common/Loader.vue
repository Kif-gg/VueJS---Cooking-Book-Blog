<template>
    <div class="loader-container">
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <span class="loading">Loading...</span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loader-container {
    width: 100%;
    height: 80vh;
}

.loading {
    display: block;
    font-weight: 700;
    text-align: center;
    font-size: 30px;
    color: #ffa07a;
    position: relative;
    top: 30vh;
    left: 50%;
    transform: translate(-35%, -35%);
    width: fit-content;
}

.lds-ring {
    display: inline-block;
    position: relative;
    left: 50%;
    top: 20vh;
    transform: translate(-50%);
    width: 80px;
    height: 80px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 104px;
    height: 104px;
    margin: 8px;
    border: 18px solid #ffa07a;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #ffa07a transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.dark-mode {
    background-color: #000;
}


.dark-mode .lds-ring div {
    border: 18px solid #fff;
    border-color: #fff transparent transparent transparent;
}

.dark-mode .loading {
    color: #fff;
}
</style>