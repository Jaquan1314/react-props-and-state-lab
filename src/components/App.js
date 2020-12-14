import React from "react";
import { getAll } from "../data/pets";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  // Gonna need a callback prop, onChangeType, passed to Filters
  onChangeType = (e) => {
    console.log("Inside change type", e.target.value);
    //  Update App state.filters.type
    this.setState({ filters: { type: e.target.value } });
  };

  onFindPetsClick = () => {
    let allPets = getAll();
    // console.log(allPets);
    let url = "/api/pets";

    if (this.state.filters.type === "all") {
      fetch(url)
        .then((r) => r.json())
        .then((pets) => {
          console.log(pets);
          this.setState({ pets: pets });
        });
    } else {
      fetch(`${url}?type=${this.state.filters.type}`)
        .then((r) => r.json())
        .then((pets) => {
          console.log(pets);
          this.setState({ pets: pets });
        });
    }
  };

  onAdoptPet = (id) => {
    let currentPets = [...this.state.pets];
    currentPets.find((pet) => pet.id === id).isAdopted = true;
    this.setState({ pets: currentPets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
