async function loadText() {
    const response = await fetch("./Editable/text.json");
    const data = await response.json();

    const about_container = document.getElementById("about");
    const owner_container = document.getElementById("owner");
    const events_container = document.getElementById("events");
    const location_container = document.getElementById("location");

    function displayItems() {
        
        // Set about section
        for (const [key, value] of Object.entries(data.about)) {
            let el = "p";
            if (key == "title") { // Check if the key is "title" to decide the element type
                el = "h2";
            }
            about_container.appendChild(document.createElement(el)).textContent = value;
        }

        // Set owner section
        for (const [key, value] of Object.entries(data.owner)) {
            let el = "p";
            if (key == "title") { // Check if the key is "title" to decide the element type
                el = "h2";
            }
            owner_container.appendChild(document.createElement(el)).textContent = value;
        }

        // Set location section
        for (const [key, value] of Object.entries(data.location)) {
            let el = "p";
            if (key == "title") { // Check if the key is "title" to decide the element type
                el = "h2";
            } else if (key == "maps_link") { // Check if the key is "maps_link" to decide the element type
                const frame = location_container.appendChild(document.createElement("iframe"));
                frame.setAttribute("src", value);
                frame.setAttribute("frameborder", "0");
                frame.setAttribute("allowfullscreen", "");
                continue;
            }
            location_container.appendChild(document.createElement(el)).textContent = value;
        }
        
        // Set events section
        events_container.appendChild(document.createElement("h2")).textContent = data.eventstitle;

        if (Array.isArray(data.events)) {
            const list_container = events_container.appendChild(document.createElement("ul"));
            list_container.setAttribute("id", "events_list");

            let id_count = 0;
            data.events.forEach(event => {
                let even_count = 1;
                for (const [key, value] of Object.entries(event)) {
                    if (even_count%2 == 1) {
                        //const ul = document.getElementById("events_list");
                        x = document.createElement("li");
                        list_container.appendChild(x).innerHTML = `<strong>${value}:</strong> `;
                        even_count++;
                        x.setAttribute("id", `event${id_count}`);
                    } else {
                        const y = document.getElementById(`event${id_count}`);
                        y.innerHTML += value;
                        id_count++;
                    }
                }
            });
        }
    }

    displayItems();
}

loadText();