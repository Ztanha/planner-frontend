export default function redirect(url) {
    window.location.hash = url;
}
export function goBack() {
    window.history.back()
}