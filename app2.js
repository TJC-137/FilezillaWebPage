async function fetchCharacters() {
    try {
        const response = await fetch("http://localhost:3000/characters");
        const characters = await response.json();

        let currentIndex = 0;
        const carouselCardsContainer = document.querySelector(".carousel-cards-container");
        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");

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

                const img = document.createElement("img");
                img.src = character.image;
                card.appendChild(img);

                const name = document.createElement("h2");
                name.textContent = character.name;
                card.appendChild(name);

                const quote = document.createElement("p");
                quote.textContent = `"${character.quote}"`;
                card.appendChild(quote);

                // Mostrar atributos adicionales
                const attribute = document.createElement("p");
                attribute.textContent = `Attribute: ${character.attribute}`;
                card.appendChild(attribute);

                const weapon = document.createElement("p");
                weapon.textContent = `Weapon: ${character.weapon}`;
                card.appendChild(weapon);

                const rarity = document.createElement("p");
                rarity.textContent = `Rarity: ${character.rarity}`;
                card.appendChild(rarity);

                const charClass = document.createElement("p");
                charClass.textContent = `Class: ${character.class}`;
                card.appendChild(charClass);

                const birthplace = document.createElement("p");
                birthplace.textContent = `Birthplace: ${character.birthplace}`;
                card.appendChild(birthplace);

                const birthday = document.createElement("p");
                birthday.textContent = `Birthday: ${character.birthday}`;
                card.appendChild(birthday);

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

        // Inicializamos el carrusel con el primer personaje
        updateCarousel();

    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

// Llamada a la función fetchCharacters al cargar la página
fetchCharacters();
