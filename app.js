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

        // Función para actualizar la visualización de un personaje
        function updateCharacter(filteredCharacters) {
            characterImage.style.transition = 'none';
            characterName.style.transition = 'none';
            characterAttribute.style.transition = 'none';
            characterWeapon.style.transition = 'none';
            characterRarity.style.transition = 'none';
            characterClass.style.transition = 'none';
            characterBirthplace.style.transition = 'none';
            characterBirthday.style.transition = 'none';
            characterQuote.style.transition = 'none';

            const character = filteredCharacters[currentIndex];  

            if (!character) {
                characterName.textContent = "No characters found!";
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

                let stars = '';
                for (let i = 0; i < Math.floor(character.rarity); i++) {
                    stars += '★';  
                }

                if (character.rarity % 1 !== 0) {
                    stars += '✩'; 
                }

                for (let i = Math.ceil(character.rarity); i < 5; i++) {
                    stars += '☆';  
                }

                characterRarity.innerHTML = stars;

                setTimeout(() => {
                    characterImage.style.transition = '';
                    characterName.style.transition = '';
                    characterAttribute.style.transition = '';
                    characterWeapon.style.transition = '';
                    characterRarity.style.transition = '';
                    characterClass.style.transition = '';
                    characterBirthplace.style.transition = '';
                    characterBirthday.style.transition = '';
                    characterQuote.style.transition = '';
                }, 50);
            };
        }

        function renderFilteredList(filteredCharacters) {
            filteredCharactersList.innerHTML = '';  
            filteredCharacters.forEach(character => {
                const characterItem = document.createElement("div");
                characterItem.classList.add("character-item");
                characterItem.textContent = character.name;
                characterItem.addEventListener("click", () => {
                    currentIndex = characters.indexOf(character);  
                    updateCharacter(filteredCharacters);
                    filteredCharactersList.classList.remove("show");  // Ocultamos la lista después de hacer clic
                });
                filteredCharactersList.appendChild(characterItem);
            });

            // Mostramos la lista con el efecto de deslizamiento
            if (filteredCharacters.length > 0) {
                filteredCharactersList.classList.add("show");
            } else {
                filteredCharactersList.classList.remove("show");
            }
        }

        updateCharacter(characters);  

        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");

        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % characters.length;  
            updateCharacter(characters);
        });

        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + characters.length) % characters.length;  
            updateCharacter(characters);
        });

        function filterCharacters() {
            const searchInput = document.getElementById("search-input").value.toLowerCase();
            const filteredCharacters = characters.filter(character => {
                return character.name.toLowerCase().startsWith(searchInput);
            });
            renderFilteredList(filteredCharacters); 
        }

        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("input", filterCharacters);  

        // Aquí añadimos el comportamiento de plegar/ocultar la lista
        searchInput.addEventListener("focus", () => {
            filteredCharactersList.classList.add("show");  // Mostrar la lista cuando el campo de búsqueda recibe foco
        });

        searchInput.addEventListener("blur", () => {
            setTimeout(() => {
                filteredCharactersList.classList.remove("show");  // Ocultar lista cuando se pierde el foco
            }, 200);
        });

        // Evitar que se cierre la lista al hacer clic en ella
        filteredCharactersList.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // Ocultar la lista si se hace clic fuera de la barra de búsqueda
        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target)) {
                filteredCharactersList.classList.remove("show");
            }
        });

    } catch (error) {
        console.error("Error fetching characters data:", error);
    }
}

fetchCharacters();
