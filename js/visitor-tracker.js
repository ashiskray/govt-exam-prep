fetch("http://localhost:5000/api/visitor", {
    method: "POST"
})
.then(response => response.json())
.then(data => {
    console.log("Visit recorded:", data);
})
.catch(error => {
    console.error("Visitor tracking error:", error);
});