async function loadImpressum() {
    const response = await fetch("./Editable/impressum.json")
    const data = await response.json();

    const impressumContainer = document.getElementById("impressum");

    function displayItems() {
        const title = impressumContainer.appendChild(document.createElement('h2'));
        title.textContent = "Impressum";

        const impressumTable = impressumContainer.appendChild(document.createElement("table"));

        /*for (const [key, value] of Object.entries(data)) {
            const ikey = impressumContainer.appendChild(document.createElement("span"));
            ikey.className = "impressum-key";
            ikey.textContent = key;

            const ivalue = impressumContainer.appendChild(document.createElement("span"));
            ivalue.className = "impressum-value";
            ivalue.textContent = value;

            impressumContainer.appendChild(document.createElement("br"));
        }*/

        for (const [key, value] of Object.entries(data)) {
            const tr = document.createElement("tr");
            const th = tr.appendChild(document.createElement("th")).textContent = key;
            const td = tr.appendChild(document.createElement("td")).textContent = value;

            impressumTable.appendChild(tr);
        }

    }

    displayItems();
}

loadImpressum();