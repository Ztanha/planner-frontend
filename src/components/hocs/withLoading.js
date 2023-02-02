const LoadingPlaceholder = () => <div className="data-loading">Loading...</div>;
import withErrorMessage from "./withErrorMessage.js";

export default function withLoading(component, data) {
    if(data === null || data?.isLoading) return LoadingPlaceholder;
    return withErrorMessage(component, data);
}



