import axios from "axios";

export default {
    start: () => {
        return (
            axios.get("/api/start")
        )

    },

    login: () => {
        return (
            axios.post("/api/login")
        )
    },

    like: (tag, quant) => {
        return (
            axios.post("/api/like", { tag, quant })
        )

    },

    follow: (quant) => {
        return (
            axios.post("/api/follow", { quant })
        )

    },

    unfollow: (quant) => {
        return (
            axios.post("/api/unfollow", { quant })
        )
    }
}