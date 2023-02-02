export default function withErrorMessage (component, data) {
    if(data?.error) return ErrorPlaceholder;
    return component;
}

function ErrorPlaceholder({data}){
    return <div className="error-message">Some error had occurred: {data.error}</div>
}