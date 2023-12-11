<template>
    <div class="quote">
        <h2>CBB - Cooking Book Blog</h2>
        <h1>{{ quote }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            quote: ""
        }
    },
    mounted() {
        this.quote = this.getRandomQuote();
    },
    watch: {
        $route() {
            this.quote = this.getRandomQuote();
        }
    },
    methods: {
        getRandomQuote() {
            const quotes = [
                "Eating is a necessity, cooking is an art",
                "Turning simple ingredients into extraordinary meals",
                "Where flavors dance and recipes sing",
                "Cooking: the art of turning recipes into memories",
                "Savor the journey of creating delicious moments",
                "In the kitchen, every recipe tells a story",
                "Cooking is love made edible",
                "Unlock the magic of the kitchen with every recipe",
                "Creating culinary masterpieces one recipe at a time",
                "From the stove to the soul, every dish has a tale",
                "Elevate your plate, one recipe at a time"
            ];
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        }
    }
}
</script>