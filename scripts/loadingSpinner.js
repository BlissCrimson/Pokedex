function showSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    spinner?.classList.remove("d_none");
}

function hideSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    spinner?.classList.add("d_none");
}