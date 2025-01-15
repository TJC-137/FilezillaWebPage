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

        function updateCharacter() {
            // Desactivar la transición mientras se actualizan los datos
            characterImage.style.transition = 'none';
            characterName.style.transition = 'none';
            characterAttribute.style.transition = 'none';
            characterWeapon.style.transition = 'none';
            characterRarity.style.transition = 'none';
            characterClass.style.transition = 'none';
            characterBirthplace.style.transition = 'none';
            characterBirthday.style.transition = 'none';
            characterQuote.style.transition = 'none';

            // Actualizamos la imagen
            const character = characters[currentIndex];
            const newImage = new Image();
            newImage.src = character.image;
            
            // Esperamos a que la imagen se haya cargado antes de mostrarla
            newImage.onload = () => {
                characterImage.src = newImage.src;

                // Ahora actualizamos el texto después de la imagen cargada
                characterName.textContent = character.name;
                characterAttribute.textContent = character.attribute;
                characterWeapon.textContent = character.weapon;
                characterClass.textContent = character.class;
                characterBirthplace.textContent = character.birthplace;
                characterBirthday.textContent = character.birthday;
                characterQuote.textContent = character.quote;

                // Generar estrellas de rareza
                let stars = '';
                for (let i = 0; i < Math.floor(character.rarity); i++) {
                    stars += '★';  // Estrella llena
                }

                if (character.rarity % 1 !== 0) {
                    stars += '✩'; // Estrella medio llena
                }

                for (let i = Math.ceil(character.rarity); i < 5; i++) {
                    stars += '☆';  // Estrella vacía
                }

                // Asignar las estrellas generadas al elemento de rareza
                characterRarity.innerHTML = stars;


                // Reactivar las transiciones de forma suave
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

        updateCharacter();  // Inicializa el primer personaje

        // Control de navegación
        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");

        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % characters.length;  // Va al siguiente, y regresa al inicio cuando llega al final
            updateCharacter();
        });

        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + characters.length) % characters.length;  // Va al anterior, y regresa al final cuando llega al primero
            updateCharacter();
        });

    } catch (error) {
        console.error("Error fetching characters data:", error);
    }
}

fetchCharacters();
