Feature: List pokemons

  Background: Navigation
    Given The app is opened

  Rule: All is listed by default

    Scenario: User can browse pokemons
      Then 151 pokemons are listed
