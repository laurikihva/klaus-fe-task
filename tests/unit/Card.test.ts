import { mount } from "@vue/test-utils";

import Card from "@/components/Card.vue";

const wrapper = mount(Card, {
  slots: {
    default: "Card content",
  },
});

describe("Loads and displays Card component", () => {
  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("contains slot content and base classes", () => {
    expect(wrapper.text()).toContain("Card content");

    expect(wrapper.classes("bg-white")).toBe(true);
    expect(wrapper.classes("rounded-lg")).toBe(true);
    expect(wrapper.classes("px-4")).toBe(true);
    expect(wrapper.classes("py-6")).toBe(true);
  });
});
