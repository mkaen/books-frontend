import { ref, onMounted, onBeforeUnmount } from "vue";
import { APP_CONFIG} from "@/constants";



export function useInactivityTimer(timeout = APP_CONFIG.sessionTimeout * 60 * 1000) {
    const inactive = ref(false);
    let timer = null;
    // const userStore = useUserStore();

    function resetTimer() {
        inactive.value = false;
        clearTimeout(timer);
        timer = setTimeout(() => {
            inactive.value = true
        }, timeout)
    }

    onMounted(() => {
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("click", resetTimer);
        window.addEventListener("scroll", resetTimer);
        resetTimer();
    });

    onBeforeUnmount(() => {
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer)
        window.removeEventListener("click", resetTimer);
        window.removeEventListener("scroll", resetTimer);
        clearTimeout(timer);
    })
    return { inactive }
}
