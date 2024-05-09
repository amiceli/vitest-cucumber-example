import {loadFeature, describeFeature} from "@amiceli/vitest-cucumber"
import {mount, type VueWrapper} from "@vue/test-utils"
import App from '@/App.vue'
import {expect} from "vitest"
import TheWelcome from "@/components/TheWelcome.vue"

const featureCampagneFilter = await loadFeature('features/example.feature')

describeFeature(featureCampagneFilter, ({BeforeAllScenarios, AfterAllScenarios, BeforeEachScenario, AfterEachScenario, ScenarioOutline, Scenario}) => {
    Scenario(`official doc link`, ({Given, When, Then}) => {
        let app: VueWrapper
        let href: string

        Given(`I'm on main page`, () => {
            app = mount(App)
        })
        When(`I click on "official docs" link`, () => {
            const welcome = app.findComponent(TheWelcome)
            const [link] = welcome.findAll('a')

            href = link.attributes('href') || ''
        })
        Then(`I'm redirect to "vuejs.org"`, () => {
            expect(href).toContain('vuejs.org')
        })
    })
    Scenario(`tooling doc`, ({Given, Then}) => {
        let app: VueWrapper
        Given(`I'm on main page`, () => {
            app = mount(App)
        })
        Then(`I can read "This project is served and bundled with Vite."`, () => {
            const text = app.text()

            expect(text).toContain(
                'This project is served and bundled with Vite'
            )
        })
    })
    ScenarioOutline(`count button click`, ({Given, When, Then}, variables) => {
        let app: VueWrapper
        const count = Number(variables.many)

        Given(`I'm on main page`, () => {
            app = mount(App)
        })
        When(`I click on main button <many> time(s)`, async () => {
            const button = app.find('button')

            for (let i = 0; i < count; i++) {
                await button.trigger('click')
            }
        })
        Then(`I see <count> in count title`, () => {
            const h1 = app.find('main > h1')

            expect(h1.text()).toContain(count)
        })
    })

})