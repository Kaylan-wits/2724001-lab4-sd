

async function FetchCountry() {
    
    try{
        const countryName = document.getElementById("Countryname").value.trim();
        const reply = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)

        if (!reply.ok) {
            alert("Country not found!");
            return;
        }
        
        const data = await reply.json();
        const country = data[0]; 

        
        document.getElementById("Capital").innerHTML = `Capital: ${country.capital ? country.capital[0] : 'N/A'}`;
        document.getElementById("Population").innerHTML = `Population: ${country.population.toLocaleString()}`;
        document.getElementById("Region").innerHTML = `Region: ${country.region}`;
        document.getElementById("Flag").innerHTML = `Flag:<br> <img src="${country.flags.png}" alt="Flag" width="100">`;

        if (country.borders && country.borders.length > 0) {
            displayBorderingCountries(country.borders);
        } 
        else {
            document.getElementById("bordering-countries").innerHTML = "<p>No bordering countries found.</p>";
        }
        

    }
    catch(error){

        console.error(error);
    }
}


async function displayBorderingCountries(borders) {
    const borderList = document.getElementById("border-list");
    borderList.innerHTML = ""; 


    for (const borderCode of borders) {
        try {
            const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
            const borderData = await borderResponse.json();
            const borderCountry = borderData[0];

            const listItem = document.createElement("li");
            listItem.innerHTML = `${borderCountry.name.common} <img src="${borderCountry.flags.png}" alt="${borderCountry.name.common} flag" width="20">`;
            borderList.appendChild(listItem);

        } catch (error) {
            console.error(`Error fetching border country with code ${borderCode}: ${error}`);
        }
    }
}


