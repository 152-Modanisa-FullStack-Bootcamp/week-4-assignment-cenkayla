import { shallowMount } from '@vue/test-utils'
import Card from "@/components/Card";


describe("Card.vue", () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(Card, {
            propsData: {
                video: {}
            }
        })
    })

    it("should component exists", () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it("should render video img", () => {
        const img = wrapper.find('img')
        expect(img.exists()).toBeTruthy()
    })

    it("should render video title", () => {
        const title = wrapper.find("div > h4")
        expect(title.exists()).toBeTruthy()
    })

    it("should render star image", () => {
        const goToDetail = wrapper.find(".star")
        expect(goToDetail.exists()).toBeTruthy()
    })

    it.each`
    caseName | initialFavoriteValue | expectedStyle 
    ${'when video selected as favorite'} | ${false} | ${{ 'background-color': 'gray' }}
`('returns $expectedStyle when $caseName with $initialFavoriteValue',
        ({ caseName, initialFavoriteValue, expectedStyle }) => {
            const localThis = {
                favorited: initialFavoriteValue
            }

            const style = Card.computed.favoriteBtnStyle.call(localThis)
            expect(style).toStrictEqual(expectedStyle)
        });


    describe('check favoriteBtnStyle functionality', () => {
        const testCases = [
            {
                caseName: 'when video selected as favorite',
                initialFavoritetValue: false,
                expectedStyle: { 'background-color': 'gray' }
            }
        ]
        for (let testCase of testCases) {
            it(testCase.caseName, () => {
                const localThis = {
                    favorited: testCase.initialFavoritetValue
                }
                const style = Card.computed.favoriteBtnStyle.call(localThis)
                expect(style).toStrictEqual(testCase.expectedStyle)
            })
        }
    })

    it('render video prop correctly', () => {
        const video = {
            "id": 1,
            "videoAddress": "https://www.youtube.com/watch?v=FXpIoQ_rT_c",
            "coverImage": "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
            "hoverImage": "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",
            "title": "Vue.js Course for Beginners [2021 Tutorial]",
            "viewCount": 254,
            "publishDateInMonth": 4,
            "ownerImage": "https://yt3.ggpht.com/ytc/AKedOLTtJvQ1Vfew91vemeLaLdhjOwGx3tTBLlreK_QUyA=s68-c-k-c0x00ffffff-no-rj",
            "ownerName": "freeCodeCamp.org",
            "description": "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications."
        }
        const wrapper = shallowMount(Card, {
            propsData: {
                video
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.find("div > h4").text()).toEqual(video.title)
    })
})

