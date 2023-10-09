
const deleteEntry = () => {
    const deleteButtons = document.querySelectorAll("#delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
            const cardId = e.target.parentElement.id;
            console.log(cardId);
            const response = await fetch(`http://127.0.0.1:4000/destinations/${cardId}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                }
            });
        });
    });
};

export default deleteEntry;
