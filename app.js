async function fetchCharacters() {
    try {
        const response = await fetch("http://localhost:3000/characters");
        const characters = await response.json();

        let currentIndex = 0;
        const characterImage = document.getElementById("character-image");
        const characterName = document.getElementById("character-name");
        const characterAttribute = document.getElementById("character-attribute");
        const characterWeapon = document.getElementById("character-weapon");
        const characterRarity = document.getElementById("character-rarity");
        const characterClass = document.getElementById("character-class");
        const characterBirthplace = document.getElementById("character-birthplace");
        const characterBirthday = document.getElementById("character-birthday");
        const characterQuote = document.getElementById("character-quote");
        const filteredCharactersList = document.getElementById("filtered-characters-list");
        const searchInput = document.getElementById("search-input");
        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");

        // Función para actualizar la visualización de un personaje
        function updateCharacter(filteredCharacters) {
            const character = filteredCharacters[currentIndex];

            if (!character) {
                characterName.textContent = "No characters found!";
                characterImage.src = "";
                return;
            }

            const newImage = new Image();
            newImage.src = character.image;

            newImage.onload = () => {
                characterImage.src = newImage.src;
                characterName.textContent = character.name;
                characterAttribute.textContent = character.attribute;
                characterWeapon.textContent = character.weapon;
                characterClass.textContent = character.class;
                characterBirthplace.textContent = character.birthplace;
                characterBirthday.textContent = character.birthday;
                characterQuote.textContent = character.quote;

                characterAttribute.className = '';
                characterAttribute.classList.add(character.attribute);

                // Mostrar rareza
                let stars = '';
                for (let i = 0; i < Math.floor(character.rarity); i++) stars += '★';
                if (character.rarity % 1 !== 0) stars += '✩';
                for (let i = Math.ceil(character.rarity); i < 5; i++) stars += '☆';
                characterRarity.innerHTML = stars;
            };
        }

        // Renderizar la lista de personajes filtrados
        function renderFilteredList(filteredCharacters) {
            filteredCharactersList.innerHTML = '';  // Limpiar la lista antes de renderizar

            filteredCharacters.forEach(character => {
                const characterItem = document.createElement("div");
                characterItem.classList.add("character-item");

                // Crear un contenedor para el nombre y la imagen
                const characterInfo = document.createElement("div");
                characterInfo.classList.add("character-info");

                // Crear el elemento de imagen
                const characterImage = new Image();
                characterImage.src = character.image;
                characterImage.classList.add("character-item-image");

                // Agregar la imagen y el nombre al contenedor
                const characterName = document.createElement("span");
                characterName.textContent = character.name;
                characterInfo.appendChild(characterImage);
                characterInfo.appendChild(characterName);

                // Agregar el contenedor a la lista
                characterItem.appendChild(characterInfo);

                // Seleccionar un personaje al hacer clic
                characterItem.addEventListener("click", () => {
                    currentIndex = characters.findIndex(c => c.name === character.name);
                    updateCharacter(filteredCharacters);
                    filteredCharactersList.classList.remove("show");  // Ocultar la lista al hacer clic
                });

                filteredCharactersList.appendChild(characterItem);
            });

            // Mostrar/Ocultar la lista
            filteredCharactersList.classList.toggle("show", filteredCharacters.length > 0);
        }


        // Filtrar personajes al escribir en el campo de búsqueda
        function filterCharacters() {
            const searchInputValue = searchInput.value.toLowerCase();
            const filteredCharacters = characters.filter(character =>
                character.name.toLowerCase().includes(searchInputValue)
            );
            renderFilteredList(filteredCharacters);
        }

        // Eventos de búsqueda
        searchInput.addEventListener("input", filterCharacters);
        searchInput.addEventListener("focus", () => {
            const filteredCharacters = characters.filter(character =>
                character.name.toLowerCase().includes(searchInput.value.toLowerCase())
            );
            renderFilteredList(filteredCharacters);
        });

        // Ocultar la lista al hacer clic fuera
        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !filteredCharactersList.contains(e.target)) {
                filteredCharactersList.classList.remove("show");
            }
        });

        // Navegación de personajes con botones
        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % characters.length;
            updateCharacter(characters);
        });

        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + characters.length) % characters.length;
            updateCharacter(characters);
        });

        // Inicializar con el primer personaje
        updateCharacter(characters);

    } catch (error) {
        console.error("Error fetching characters data:", error);
    }
}

fetchCharacters();
