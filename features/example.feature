Feature: Simple Vue App
    Scenario: official doc link
        Given I'm on main page
        When I click on "official docs" link
        Then I'm redirect to "vuejs.org"

    Scenario: tooling doc
        Given I'm on main page
        Then  I can read "This project is served and bundled with Vite."

    Scenario Outline: count button click
        Given I'm on main page
        When I click on main button <many> time(s)
        Then I see <count> in count title

        Examples:
            | many |
            | 1    |
            | 2    |
            | 7    |
