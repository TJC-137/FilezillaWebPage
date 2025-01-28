async function fetchCharacters() {
    try {
        const response = await fetch("http://localhost:3000/characters");
        const characters = await response.json();

        let currentIndex = 0;
        const carouselCardsContainer = document.querySelector(".carousel-cards-container");
        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");
        const searchInput = document.getElementById("search-input");
        const filteredCharactersList = document.getElementById("filtered-characters-list");

        // Función para actualizar la vista del carrusel
        function updateCarousel() {
            carouselCardsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas tarjetas

            // Calcular los índices para las tarjetas
            const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
            const nextIndex = (currentIndex + 1) % characters.length;

            const characterPrev = characters[prevIndex];
            const characterCurrent = characters[currentIndex];
            const characterNext = characters[nextIndex];

            // Crear tarjetas y agregarlas al contenedor
            const createCard = (character) => {
                const card = document.createElement("div");
                card.classList.add("carousel-card");
            
                // Crear imagen
                const img = document.createElement("img");
                img.src = character.image;
                card.appendChild(img);
            
                // Crear nombre
                const name = document.createElement("h2");
                name.textContent = character.name;
                card.appendChild(name);
            
                // Crear el contenedor del atributo
                const attributeContainer = document.createElement("div");
                attributeContainer.classList.add("attribute-container");

                // Crear el elemento del atributo con título en negrita
                const attribute = document.createElement("p");
                attribute.id = "character-attribute"; // Asignamos el ID correcto para el atributo

                // Asegurarnos de que solo el valor cambie de color
                if (character.attribute) {
                    attribute.innerHTML = `<strong>Attribute:</strong>&nbsp;<span class="attribute-response">${character.attribute}</span>`;
                    const attributeClass = character.attribute;
                    attribute.classList.add(attributeClass); // Añadimos la clase dinámica del atributo
                } else {
                    attribute.innerHTML = `<strong>Attribute:</strong> <span class="default-attribute">Not Available</span>`;  // También espacio aquí
                }

                attributeContainer.appendChild(attribute);
                card.appendChild(attributeContainer);

                // Mostrar la rareza en estrellas según el número indicado
                const rarity = document.createElement("p");
                rarity.innerHTML = `<strong>Rarity:</strong> `;
            
                // Crear un contenedor para las estrellas de rareza (para aplicar el hover solo a las estrellas)
                const rarityStars = document.createElement("span");
                rarityStars.id = "character-rarity-stars";  // Contenedor para las estrellas
            
                // Crear las estrellas de rareza
                let stars = '';
                for (let i = 0; i < Math.floor(character.rarity); i++) stars += '★';  // Estrellas llenas
                if (character.rarity % 1 !== 0) stars += '✩';  // Estrella parcial si es decimal
                for (let i = Math.ceil(character.rarity); i < 5; i++) stars += '☆';  // Estrellas vacías para completar 5
            
                rarityStars.innerHTML = stars;  // Añadir las estrellas a la rareza
                rarity.appendChild(rarityStars);  // Añadir las estrellas al p de rareza
                card.appendChild(rarity);
            
                // Otros detalles
                const weapon = document.createElement("p");
                weapon.innerHTML = `<strong>Weapon:</strong> ${character.weapon}`;
                card.appendChild(weapon);
            
                const charClass = document.createElement("p");
                charClass.innerHTML = `<strong>Class:</strong> ${character.class}`;
                card.appendChild(charClass);
            
                const birthplace = document.createElement("p");
                birthplace.innerHTML = `<strong>Birthplace:</strong> ${character.birthplace}`;
                card.appendChild(birthplace);
            
                const birthday = document.createElement("p");
                birthday.innerHTML = `<strong>Birthday:</strong> ${character.birthday}`;
                card.appendChild(birthday);
            
                // Crear cita y agregarla al final
                const quote = document.createElement("p");
                quote.textContent = `"${character.quote}"`;
                card.appendChild(quote);
            
                return card;
            };

            const prevCard = createCard(characterPrev);
            const currentCard = createCard(characterCurrent);
            const nextCard = createCard(characterNext);

            // Agregar las tarjetas al contenedor
            carouselCardsContainer.appendChild(prevCard);
            carouselCardsContainer.appendChild(currentCard);
            carouselCardsContainer.appendChild(nextCard);
        }

        // Función para ir al siguiente personaje
        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % characters.length; // ciclo al principio cuando llega al final
            updateCarousel();
        });

        // Función para ir al personaje anterior
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + characters.length) % characters.length; // ciclo al final cuando va al principio
            updateCarousel();
        });

        // Filtrar personajes al escribir en el campo de búsqueda
        function filterCharacters() {
            const searchInputValue = searchInput.value.toLowerCase();
            const filteredCharacters = characters.filter(character =>
                character.name.toLowerCase().includes(searchInputValue)
            );
            renderFilteredList(filteredCharacters);
        }

        // Renderizar la lista de personajes filtrados
        function renderFilteredList(filteredCharacters) {
            filteredCharactersList.innerHTML = '';  // Limpiar la lista antes de renderizar

            // Renderizar cada personaje en la lista
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
                    updateCarousel();
                    filteredCharactersList.classList.remove("show");  // Ocultar la lista al hacer clic
                });

                // Agregar el personaje a la lista
                filteredCharactersList.appendChild(characterItem);
            });

            // Mostrar/Ocultar la lista
            filteredCharactersList.classList.toggle("show", filteredCharacters.length > 0);
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

        // Inicializamos el carrusel con el primer personaje
        updateCarousel();

    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

// Llamada a la función fetchCharacters al cargar la página
fetchCharacters();
